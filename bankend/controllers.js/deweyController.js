// [file name]: backend/controllers/deweyController.js
const { DeweyCategory, Book } = require('../models');

// Get all Dewey categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await DeweyCategory.findAll({
      order: [['number', 'ASC']]
    });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Get category by number
exports.getCategoryByNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const category = await DeweyCategory.findOne({
      where: { number }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Get books in this category
    const books = await Book.findAll({
      where: { deweyCategory: number },
      order: [['title', 'ASC']],
      limit: 50 // Limit for performance
    });
    
    res.json({
      success: true,
      data: {
        category,
        books
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category',
      error: error.message
    });
  }
};

// Get category statistics
exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await Book.findAll({
      attributes: [
        'deweyCategory',
        [sequelize.fn('COUNT', sequelize.col('id')), 'bookCount']
      ],
      group: ['deweyCategory'],
      order: [['deweyCategory', 'ASC']]
    });
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching category stats',
      error: error.message
    });
  }
};