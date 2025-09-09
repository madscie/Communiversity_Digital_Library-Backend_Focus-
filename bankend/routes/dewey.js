// [file name]: backend/routes/dewey.js
const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryByNumber,
  getCategoryStats
} = require('../controllers/deweyController');

// Public routes
router.get('/', getAllCategories);
router.get('/stats', getCategoryStats);
router.get('/:number', getCategoryByNumber);

module.exports = router;