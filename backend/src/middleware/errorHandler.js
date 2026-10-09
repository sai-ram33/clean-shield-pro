/**
 * Global Error Handler Middleware
 * Clean Shield Pro Express Backend
 */

module.exports = (err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
