/**
 * Clean Shield Pro - Express.js REST API Server
 * Professional Deep Cleaning & Odorless Pest Control Platform
 * Rajamahendravaram & 15+ Operational Hubs
 * MongoDB Atlas Backend Integration
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const { seedOwnerAdmin } = require('./src/controllers/authController');

const authRoutes = require('./src/routes/authRoutes');
const bookingsRoutes = require('./src/routes/bookingsRoutes');
const enquiriesRoutes = require('./src/routes/enquiriesRoutes');
const reviewsRoutes = require('./src/routes/reviewsRoutes');
const servicesRoutes = require('./src/routes/servicesRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend clients
const clientOrigin = process.env.CLIENT_ORIGIN || '*';
app.use(cors({
  origin: clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger in Development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Health Check
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'online',
    platform: 'Clean Shield Pro API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'clean_shield_pro'
    },
    endpoints: {
      authLogin: 'POST /api/auth/login',
      authMe: 'GET /api/auth/me',
      bookings: 'GET, POST /api/bookings',
      trackBooking: 'GET /api/bookings/track/:query',
      enquiries: 'GET, POST /api/enquiries',
      reviews: 'GET, POST /api/reviews',
      services: 'GET /api/services',
      pricing: 'GET, PUT /api/pricing',
      config: 'GET /api/config',
      branches: 'GET /api/branches'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/enquiries', enquiriesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api', servicesRoutes);

// Serve Frontend Static Assets
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Fallback to frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global Error Handler Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
const startServer = async () => {
  // Connect to MongoDB Atlas
  const conn = await connectDB();
  if (conn) {
    // Ensure owner admin user exists
    await seedOwnerAdmin();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
=====================================================
🛡️  CLEAN SHIELD PRO - BACKEND API SERVER RUNNING
=====================================================
🚀 Server URL:       http://localhost:${PORT}
🌐 API Base:         http://localhost:${PORT}/api
🔐 Owner Login:      http://localhost:${PORT}/api/auth/login
🩺 Health Check:     http://localhost:${PORT}/api/health
📁 Frontend Served:  http://localhost:${PORT}/
📦 Database:         MongoDB Atlas (clean_shield_pro)
=====================================================
    `);
  });
};

startServer();

module.exports = app;
