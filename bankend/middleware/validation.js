// [file name]: backend/middleware/validation.js
const Joi = require('joi');

// Validation schemas
const schemas = {
  // Book validation
  book: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    isbn: Joi.string().optional().allow(''),
    ddc: Joi.string().pattern(/^\d{3}(\.\d+)?$/).required(),
    category: Joi.string().min(1).max(100).required(),
    description: Joi.string().max(1000).optional().allow(''),
    keywords: Joi.array().items(Joi.string()).optional(),
    location: Joi.string().max(100).required(),
    status: Joi.string().valid('available', 'checked_out', 'reserved', 'maintenance').optional(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    publisher: Joi.string().max(100).optional().allow(''),
    pageCount: Joi.number().integer().min(1).optional(),
    thumbnail: Joi.string().uri().optional().allow('')
  }),

  // User registration validation
  register: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().max(50).optional().allow(''),
    lastName: Joi.string().max(50).optional().allow('')
  }),

  // User login validation
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }),

  // Profile update validation
  profile: Joi.object({
    firstName: Joi.string().max(50).optional().allow(''),
    lastName: Joi.string().max(50).optional().allow(''),
    email: Joi.string().email().required()
  })
};

// Validation middleware
const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schemas[schema].validate(req[property]);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

module.exports = {
  validate,
  schemas
};