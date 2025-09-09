// [file name]: backend/routes/books.js
const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');
const { validate } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);

// Protected routes (admin/librarian only)
router.post('/', authenticate, authorize(['admin', 'librarian']), validate('book', 'body'), createBook);
router.put('/:id', authenticate, authorize(['admin', 'librarian']), validate('book', 'body'), updateBook);
router.delete('/:id', authenticate, authorize(['admin']), deleteBook);

module.exports = router;