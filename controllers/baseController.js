const pool = require("../database/") // adjust path if needed

const invModel = {}

/* ***********************
 * Get all classifications (already existing)
 *************************/
// Example existing function
invModel.getClassifications = async function () {
  const sql = "SELECT * FROM car_classifications ORDER BY classification_name ASC"
  return await pool.query(sql)
}

/* ******************************
 * Get Inventory by Classification ID
 ******************************/
invModel.getInventoryByClassificationId = async function (classification_id) {
  const sql = "SELECT * FROM inventory WHERE classification_id = $1"
  const data = await pool.query(sql, [classification_id])
  return data.rows
}

/* *************************************
 * Get Inventory Item by Inventory ID
 *************************************/
invModel.getInventoryById = async function (inv_id) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1"
  const data = await pool.query(sql, [inv_id])
  return data.rows[0] // return single vehicle object
}

module.exports = invModel