// models/inventory-model.js
// Parameterized query to fetch a vehicle by inv_id.

const pool = require('../database/connection'); // see file below

async function getVehicleById(inv_id) {
  const sql = `
    SELECT
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles
    FROM inventory
    WHERE inv_id = $1
    LIMIT 1;
  `;
  const values = [inv_id];

  const { rows } = await pool.query(sql, values);
  return rows[0];
}

module.exports = {
  getVehicleById,
};
