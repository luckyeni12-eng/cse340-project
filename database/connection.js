// database/connection.js
// Simple pg Pool. Adjust env vars as needed.

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/cse_motors',
  // If you deploy to Render / Heroku with SSL, enable ssl: { rejectUnauthorized: false }
  // ssl: { rejectUnauthorized: false },
});

module.exports = pool;
