// [file name]: backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize MySQL database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'communiversity_library',
  process.env.DB_USER || 'library_admin',
  process.env.DB_PASSWORD || 'library_password_2024',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:', error.message);
    return false;
  }
};

// Sync database models
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('✅ Database synced successfully.');
    return true;
  } catch (error) {
    console.error('❌ Error syncing database:', error.message);
    return false;
  }
};

// Create database if it doesn't exist
const createDatabase = async () => {
  try {
    const tempSequelize = new Sequelize(
      '',
      process.env.DB_USER || 'library_admin',
      process.env.DB_PASSWORD || 'library_password_2024',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
      }
    );

    await tempSequelize.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'communiversity_library'}\` 
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    console.log('✅ Database created or already exists.');
    await tempSequelize.close();
    return true;
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    return false;
  }
};

module.exports = { 
  sequelize, 
  testConnection, 
  syncDatabase,
  createDatabase
};
