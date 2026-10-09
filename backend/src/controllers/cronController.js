/**
 * Cron Job & Scheduled Worker Controller
 * Clean Shield Pro Express Backend
 * 
 * Functions:
 * 1. Server Keep-Alive / Anti-Sleep Ping (prevents free-tier hosts like Render/Koyeb from idling)
 * 2. MongoDB Atlas Connection Keep-Alive & Active Pool Verification
 * 3. System Metrics Snapshot (Active Bookings, Leads, Reviews)
 * 4. Routine Data Maintenance & Housekeeping (Optional cleanup flag)
 * 5. Flexible Security via optional CRON_SECRET token
 */

const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');
const Review = require('../models/Review');

// In-memory runtime telemetry for cron executions
let cronStats = {
  totalExecutions: 0,
  lastExecutionAt: null,
  lastExecutionDurationMs: 0,
  lastExecutionStatus: 'Not executed yet',
  totalKeepAlivePings: 0,
  lastKeepAliveAt: null
};

/**
 * Validates request authorization against CRON_SECRET (if defined in .env).
 * If CRON_SECRET is not set, requests are allowed in development/open mode.
 */
const verifyCronAuth = (req) => {
  const configuredSecret = process.env.CRON_SECRET;

  // Open mode if no secret is configured
  if (!configuredSecret) {
    return {
      authorized: true,
      mode: 'open',
      message: 'CRON_SECRET not configured in .env; endpoint running in open mode.'
    };
  }

  // Check Bearer token, custom header, or query param
  const authHeader = req.headers['authorization'] || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
  const customHeader = req.headers['x-cron-secret'] || '';
  const querySecret = req.query.key || req.query.secret || '';

  const providedSecret = bearerToken || customHeader || querySecret;

  if (providedSecret && providedSecret === configuredSecret) {
    return {
      authorized: true,
      mode: 'authenticated'
    };
  }

  return {
    authorized: false,
    reason: 'Unauthorized: Missing or invalid CRON_SECRET. Provide via Bearer token, x-cron-secret header, or ?key= query parameter.'
  };
};

/**
 * Main Cron Job Execution Handler
 * Route: GET /api/cron or POST /api/cron
 */
exports.executeCronJob = async (req, res, next) => {
  const startTime = Date.now();

  try {
    // 1. Verify Authorization
    const authCheck = verifyCronAuth(req);
    if (!authCheck.authorized) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: authCheck.reason,
        timestamp: new Date().toISOString()
      });
    }

    const executedTasks = [];
    const taskDetails = {};

    // 2. Task 1: Server Keep-Alive & Health Check
    executedTasks.push('serverKeepAlive');
    const memoryUsage = process.memoryUsage();
    const serverHealth = {
      status: 'online',
      uptimeSeconds: Math.floor(process.uptime()),
      uptimeFormatted: formatUptime(process.uptime()),
      nodeVersion: process.version,
      memory: {
        rssMb: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
        heapUsedMb: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
        heapTotalMb: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100
      }
    };
    taskDetails.server = serverHealth;

    // 3. Task 2: Database Connection & Active Ping
    executedTasks.push('databaseHealthCheck');
    let isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected && mongoose.connection.readyState === 0) {
      const connectDB = require('../config/db');
      await connectDB();
      isDbConnected = mongoose.connection.readyState === 1;
    }

    let dbPingResult = 'disconnected';

    if (isDbConnected && mongoose.connection.db) {
      try {
        await mongoose.connection.db.command({ ping: 1 });
        dbPingResult = 'pong (active)';
      } catch (dbErr) {
        dbPingResult = `error: ${dbErr.message}`;
      }
    }

    const connectDB = require('../config/db');
    const lastError = connectDB.getLastError ? connectDB.getLastError() : null;

    const dbHealth = {
      status: isDbConnected ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      ping: dbPingResult,
      host: mongoose.connection.host || 'unknown',
      databaseName: mongoose.connection.name || 'clean_shield_pro',
      error: !isDbConnected ? lastError : null
    };
    taskDetails.database = dbHealth;

    // 4. Task 3: Operational System Snapshot
    executedTasks.push('operationalSnapshot');
    let metrics = {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      totalEnquiries: 0,
      newEnquiries: 0,
      totalReviews: 0
    };

    if (isDbConnected) {
      try {
        const [
          totalBookings,
          pendingBookings,
          confirmedBookings,
          totalEnquiries,
          newEnquiries,
          totalReviews
        ] = await Promise.all([
          Booking.countDocuments().catch(() => 0),
          Booking.countDocuments({ status: 'Pending' }).catch(() => 0),
          Booking.countDocuments({ status: 'Confirmed' }).catch(() => 0),
          Enquiry.countDocuments().catch(() => 0),
          Enquiry.countDocuments({ status: 'New' }).catch(() => 0),
          Review.countDocuments().catch(() => 0)
        ]);

        metrics = {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          totalEnquiries,
          newEnquiries,
          totalReviews
        };
      } catch (metricsErr) {
        console.warn(`[CRON] Warning fetching metrics: ${metricsErr.message}`);
      }
    }
    taskDetails.metrics = metrics;

    // 5. Task 4: Optional Maintenance / Housekeeping (when ?cleanup=true or task=cleanup)
    const runCleanup = req.query.cleanup === 'true' || req.query.task === 'cleanup' || (req.body && req.body.task === 'cleanup');
    if (runCleanup) {
      executedTasks.push('maintenanceCleanup');
      let cleanupReport = {
        action: 'maintenance_audit',
        timestamp: new Date().toISOString()
      };

      if (isDbConnected) {
        // Find bookings with cancelled status older than 60 days if any
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const cancelledCount = await Booking.countDocuments({
          status: 'Cancelled',
          createdAt: { $lt: sixtyDaysAgo }
        }).catch(() => 0);

        cleanupReport.archivableCancelledBookings = cancelledCount;
        cleanupReport.status = 'completed';
      } else {
        cleanupReport.status = 'skipped_database_offline';
      }
      taskDetails.cleanup = cleanupReport;
    }

    const durationMs = Date.now() - startTime;

    // Update in-memory telemetry
    cronStats.totalExecutions += 1;
    cronStats.lastExecutionAt = new Date().toISOString();
    cronStats.lastExecutionDurationMs = durationMs;
    cronStats.lastExecutionStatus = 'success';

    console.log(`⏱️ [CRON JOB] #${cronStats.totalExecutions} executed successfully in ${durationMs}ms at ${cronStats.lastExecutionAt}`);

    res.status(200).json({
      success: true,
      message: 'Clean Shield Pro scheduled cron job executed successfully.',
      timestamp: new Date().toISOString(),
      executionDurationMs: durationMs,
      authMode: authCheck.mode || 'authenticated',
      tasksExecuted: executedTasks,
      details: taskDetails,
      telemetry: {
        totalExecutionsSinceBoot: cronStats.totalExecutions,
        lastKeepAliveAt: cronStats.lastKeepAliveAt
      }
    });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    cronStats.lastExecutionStatus = `failed: ${err.message}`;

    console.error(`❌ [CRON JOB] Execution failed in ${durationMs}ms:`, err);
    res.status(500).json({
      success: false,
      message: 'Cron job encountered an internal error during execution.',
      error: err.message,
      timestamp: new Date().toISOString(),
      executionDurationMs: durationMs
    });
  }
};

/**
 * Lightweight Keep-Alive / Anti-Sleep Ping
 * Designed for free-tier platforms (e.g. Render, Koyeb, Glitch, cron-job.org, UptimeRobot)
 * Route: GET /api/cron/ping or GET /api/cron/keep-alive
 */
exports.pingKeepAlive = async (req, res) => {
  cronStats.totalKeepAlivePings += 1;
  cronStats.lastKeepAliveAt = new Date().toISOString();

  let isDbConnected = mongoose.connection.readyState === 1;
  if (!isDbConnected && mongoose.connection.readyState === 0) {
    const connectDB = require('../config/db');
    await connectDB();
    isDbConnected = mongoose.connection.readyState === 1;
  }

  const connectDB = require('../config/db');
  const lastError = connectDB.getLastError ? connectDB.getLastError() : null;

  res.status(200).json({
    success: true,
    status: 'awake',
    platform: 'Clean Shield Pro API',
    timestamp: cronStats.lastKeepAliveAt,
    uptimeSeconds: Math.floor(process.uptime()),
    uptimeFormatted: formatUptime(process.uptime()),
    database: {
      status: isDbConnected ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      error: !isDbConnected ? lastError : null
    },
    keepAlivePingsCount: cronStats.totalKeepAlivePings,
    lastFullCronExecution: cronStats.lastExecutionAt
  });
};

/**
 * Returns Cron Status & Telemetry
 * Route: GET /api/cron/status
 */
exports.getCronStatus = (req, res) => {
  res.status(200).json({
    success: true,
    telemetry: cronStats,
    serverUptimeSeconds: Math.floor(process.uptime()),
    serverUptimeFormatted: formatUptime(process.uptime()),
    hasCronSecretConfigured: !!process.env.CRON_SECRET,
    instructions: {
      fullJob: 'GET /api/cron or POST /api/cron',
      lightPing: 'GET /api/cron/ping',
      cleanupTask: 'GET /api/cron?cleanup=true',
      authMethods: 'Bearer token, x-cron-secret header, or ?key=<CRON_SECRET> query param'
    }
  });
};

/**
 * Helper to format seconds into human-readable string (e.g. 2h 15m 30s)
 */
function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join(' ');
}
