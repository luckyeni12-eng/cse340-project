const pool = require('../db/connection'); // Assuming you have a PostgreSQL connection

// Task 2: Insert Classification
exports.insertClassification = async (classification_name) => {
  const sql = 'INSERT INTO classifications (classification_name) VALUES ($1)';
  return pool.query(sql, [classification_name]);
};

// Task 3: Insert Inventory
exports.insertInventory = async ({ classification_id, inv_make, inv_model, inv_year, inv_price, inv_image, inv_thumbnail }) => {
  const sql = `
    INSERT INTO inventory
    (classification_id, inv_make, inv_model, inv_year, inv_price, inv_image, inv_thumbnail)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  return pool.query(sql, [classification_id, inv_make, inv_model, inv_year, inv_price, inv_image, inv_thumbnail]);
};

// Get all classifications
exports.getClassifications = async () => {
  const sql = 'SELECT * FROM classifications ORDER BY classification_name';
  return pool.query(sql);
};