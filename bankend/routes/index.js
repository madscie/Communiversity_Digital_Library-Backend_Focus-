// [file name]: backend/routes/index.js
const express = require('express');
const router = express.Router();

// Import route modules
const bookRoutes = require('./books');
const deweyRoutes = require('./dewey');
const authRoutes = require('./auth');

// Use routes
router.use('/books', bookRoutes);
router.use('/dewey', deweyRoutes);
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;