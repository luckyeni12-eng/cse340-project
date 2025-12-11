// models/inventory-model.js
const pool = require("../db/connection")

async function addClassification(classification_name) {
  const sql = "INSERT INTO classification (classification_name) VALUES (?)"
  const [result] = await pool.execute(sql, [classification_name])
  return result
}

async function getClassifications() {
  const [rows] = await pool.execute(
    "SELECT classification_id, classification_name FROM classification ORDER BY classification_name"
  )
  return rows
}

async function getInventoryByType(classificationName) {
  const sql = `
    SELECT i.*, c.classification_name
    FROM inventory i
    JOIN classification c
      ON i.classification_id = c.classification_id
    WHERE c.classification_name = ?
    ORDER BY i.inv_make, i.inv_model
  `
  const [rows] = await pool.execute(sql, [classificationName])
  return rows
}

async function getVehicleById(inv_id) {
  const sql = `
    SELECT i.*, c.classification_name
    FROM inventory i
    JOIN classification c
      ON i.classification_id = c.classification_id
    WHERE i.inv_id = ?
  `
  const [rows] = await pool.execute(sql, [inv_id])
  return rows[0]
}

async function addInventory(data) {
  const sql = `
    INSERT INTO inventory 
    (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  const params = [
    data.classification_id,
    data.inv_make,
    data.inv_model,
    data.inv_year,
    data.inv_description,
    data.inv_image,
    data.inv_thumbnail,
    data.inv_price,
    data.inv_miles
  ]

  const [result] = await pool.execute(sql, params)
  return result
}

module.exports = {
  addClassification,
  getClassifications,
  getInventoryByType,
  getVehicleById,
  addInventory
}