/**
 * Admin Authentication Middleware
 * Validates JWT token from Authorization: Bearer <token>
 * Restricts sensitive administrative mutations (status changes, deletions)
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'clean_shield_pro_secure_jwt_token_key_2026';

const protectAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Admin authentication token required to perform this action.'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Malformed authorization header.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired admin token. Please sign in again.'
    });
  }
};

module.exports = {
  protectAdmin
};
