/**
 * MongoDB Atlas Connection Module
 * Clean Shield Pro Backend
 */

const dns = require('dns');
const mongoose = require('mongoose');

let lastDbError = null;

// On Windows local networks, ISP routers often block SRV records; set Google DNS
if (process.platform === 'win32') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  } catch (e) {
    // Ignore if not supported
  }
}

const connectDB = async () => {
  try {
    const defaultUri = 'mongodb+srv://sairamvemula15_db_user:xHJjICKtI6rXalNR@cluster0.uyjt7lp.mongodb.net/clean_shield_pro?retryWrites=true&w=majority';
    const uri = process.env.MONGODB_URI || defaultUri;

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });

    lastDbError = null;
    console.log(`✅ MongoDB Connected successfully to host: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    lastDbError = error.message;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // If querySrv error on cloud containers, try fallback DNS once
    if (error.message.includes('querySrv')) {
      try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        const retryConn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
        lastDbError = null;
        console.log(`✅ MongoDB Connected on retry: ${retryConn.connection.host}`);
        return retryConn;
      } catch (retryErr) {
        lastDbError = retryErr.message;
      }
    }

    return null;
  }
};

connectDB.getLastError = () => lastDbError;

module.exports = connectDB;
