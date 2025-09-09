// [file name]: backend/controllers/bookController.js
const { Book, DeweyCategory } = require('../models');
const { Op } = require('sequelize');

// Get all books with pagination and filtering
exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, status } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = {};
    
    // Filter by category
    if (category) {
      whereClause.deweyCategory = category;
    }
    
    // Filter by status
    if (status) {
      whereClause.status = status;
    }
    
    // Search functionality
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { ddc: { [Op.like]: `%${search}%` } }
      ];
    }
    
    const { count, rows: books } = await Book.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: offset,
      order: [['title', 'ASC']]
    });
    
    res.json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    });
  }
};

// Create new book
exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    
    // Determine Dewey category from DDC
    if (bookData.ddc) {
      bookData.deweyCategory = getDeweyCategory(bookData.ddc);
    }
    
    const book = await Book.create(bookData);
    
    // Update category count
    if (book.deweyCategory) {
      await updateCategoryCount(book.deweyCategory);
    }
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating book',
      error: error.message
    });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookData = req.body;
    
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Determine Dewey category if DDC changed
    if (bookData.ddc && bookData.ddc !== book.ddc) {
      bookData.deweyCategory = getDeweyCategory(bookData.ddc);
    }
    
    await book.update(bookData);
    
    // Update category counts if category changed
    if (bookData.deweyCategory && bookData.deweyCategory !== book.deweyCategory) {
      await updateCategoryCount(bookData.deweyCategory);
      await updateCategoryCount(book.deweyCategory);
    }
    
    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const oldCategory = book.deweyCategory;
    await book.destroy();
    
    // Update category count
    if (oldCategory) {
      await updateCategoryCount(oldCategory);
    }
    
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message
    });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    const { q: query } = req.query;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const { count, rows: books } = await Book.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { author: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { ddc: { [Op.like]: `%${query}%` } },
          { category: { [Op.like]: `%${query}%` } }
        ]
      },
      limit: parseInt(limit),
      offset: offset,
      order: [['title', 'ASC']]
    });
    
    res.json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching books',
      error: error.message
    });
  }
};

// Helper function to determine Dewey category from DDC
function getDeweyCategory(ddc) {
  const ddcNum = parseFloat(ddc);
  if (isNaN(ddcNum)) return "000-099";
  
  if (ddcNum >= 0 && ddcNum < 100) return "000-099";
  if (ddcNum >= 100 && ddcNum < 200) return "100-199";
  if (ddcNum >= 200 && ddcNum < 300) return "200-299";
  if (ddcNum >= 300 && ddcNum < 400) return "300-399";
  if (ddcNum >= 400 && ddcNum < 500) return "400-499";
  if (ddcNum >= 500 && ddcNum < 600) return "500-599";
  if (ddcNum >= 600 && ddcNum < 700) return "600-699";
  if (ddcNum >= 700 && ddcNum < 800) return "700-799";
  if (ddcNum >= 800 && ddcNum < 900) return "800-899";
  if (ddcNum >= 900 && ddcNum < 1000) return "900-999";
  
  return "000-099";
}

// Helper function to update category count
async function updateCategoryCount(categoryNumber) {
  const count = await Book.count({
    where: { deweyCategory: categoryNumber }
  });
  
  await DeweyCategory.update(
    { bookCount: count },
    { where: { number: categoryNumber } }
  );
}