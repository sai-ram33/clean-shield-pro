/**
 * MongoDB Atlas Connection Module
 * Clean Shield Pro Backend
 */

const dns = require('dns');
const mongoose = require('mongoose');

// Configure reliable DNS servers on Windows/local networks for SRV record lookups
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore if custom dns servers cannot be set in current environment
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });

    console.log(`✅ MongoDB Connected successfully to host: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    return null;
  }
};

module.exports = connectDB;
