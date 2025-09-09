// [file name]: backend/models/Book.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING(20),
    unique: true
  },
  ddc: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: 'Dewey Decimal Classification number'
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  keywords: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  location: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('available', 'checked_out', 'reserved', 'maintenance'),
    defaultValue: 'available'
  },
  deweyCategory: {
    type: DataTypes.STRING(10),
    allowNull: false,
    field: 'dewey_category'
  },
  publishedYear: {
    type: DataTypes.INTEGER,
    field: 'published_year'
  },
  publisher: {
    type: DataTypes.STRING(100)
  },
  pageCount: {
    type: DataTypes.INTEGER,
    field: 'page_count'
  },
  thumbnail: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'books',
  timestamps: true,
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['author']
    },
    {
      fields: ['ddc']
    },
    {
      fields: ['dewey_category']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Book;