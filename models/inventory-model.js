const pool = require('../db/connection');

// Get inventory by classification
async function getInventoryByClassification(type) {
  const sql = `
    SELECT inv_id, inv_make, inv_model, inv_year,
           inv_price, inv_miles, inv_color,
           inv_image_full, inv_classification
    FROM inventory
    WHERE inv_classification = ?
  `;
  const [rows] = await pool.execute(sql, [type]);
  return rows;
}

// Get all inventory
async function getAllInventory() {
  const sql = `SELECT * FROM inventory`;
  const [rows] = await pool.execute(sql);
  return rows;
}

module.exports = {
  getInventoryByClassification,
  getAllInventory
};