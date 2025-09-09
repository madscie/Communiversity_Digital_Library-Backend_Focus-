// [file name]: backend/models/DeweyCategory.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DeweyCategory = sequelize.define('DeweyCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  number: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  icon: {
    type: DataTypes.STRING(20)
  },
  bookCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'book_count'
  }
}, {
  tableName: 'dewey_categories',
  timestamps: true,
  indexes: [
    {
      fields: ['number']
    }
  ]
});

module.exports = DeweyCategory;