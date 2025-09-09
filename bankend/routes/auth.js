// [file name]: backend/routes/auth.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', validate('register', 'body'), register);
router.post('/login', validate('login', 'body'), login);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, validate('profile', 'body'), updateProfile);

module.exports = router;