// [file name]: backend/scripts/initMySQLDatabase.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'library_admin',
  password: process.env.DB_PASSWORD || 'library_password_2024',
  database: process.env.DB_NAME || 'communiversity_library',
  multipleStatements: true
};

// Initialize MySQL database
const initDatabase = async () => {
  let connection;
  
  try {
    console.log('🚀 Starting MySQL database initialization...');
    
    // Create connection without specifying database first
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    
    connection = await mysql.createConnection(tempConfig);
    
    // Create database if it doesn't exist
    console.log('📦 Creating database...');
    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database} 
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    
    // Use the database
    await connection.execute(`USE ${dbConfig.database}`);
    
    // Read and execute schema SQL
    console.log('📊 Creating tables...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    await connection.execute(schemaSQL);
    
    // Read and execute seed data SQL
    console.log('🌱 Seeding data...');
    const seedPath = path.join(__dirname, '../database/seed_data.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');
    await connection.execute(seedSQL);
    
    console.log('✅ MySQL database initialization completed successfully!');
    console.log('📚 Database ready with:');
    console.log('   - Dewey Decimal categories');
    console.log('   - Sample books');
    console.log('   - Default user accounts');
    console.log('\n🔑 Default login credentials:');
    console.log('   Admin: username=admin, password=admin123');
    console.log('   Librarian: username=librarian, password=library123');
    console.log('   User: username=john_doe, password=user123');
    
  } catch (error) {
    console.error('❌ Error initializing MySQL database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run initialization if called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };