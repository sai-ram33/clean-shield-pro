const express = require('express');
const router = express.Router();
const cronController = require('../controllers/cronController');

// Main Cron Execution (Supports GET and POST for maximum compatibility with cron providers)
router.get('/', cronController.executeCronJob);
router.post('/', cronController.executeCronJob);

// Lightweight Keep-Alive Ping Endpoints (Optimized for Render / UptimeRobot / cron-job.org)
router.get('/ping', cronController.pingKeepAlive);
router.get('/keep-alive', cronController.pingKeepAlive);

// Cron Subsystem Status and Telemetry
router.get('/status', cronController.getCronStatus);

module.exports = router;
