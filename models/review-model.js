// Import the database connection
import pool from '../db/connection.js'; // Correct path to your connection.js

/* Add Review */
async function addReview(inv_id, review_title, review_text, review_rating) {
  try {
    const sql = `
      INSERT INTO review (inv_id, review_title, review_text, review_rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(sql, [inv_id, review_title, review_text, review_rating]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/* Get reviews by vehicle */
async function getReviewsByInventoryId(inv_id) {
  try {
    const sql = `
      SELECT * 
      FROM review 
      WHERE inv_id = $1 
      ORDER BY review_date DESC;
    `;
    const result = await pool.query(sql, [inv_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Default export so you can import like: import invModel from '...'
const invModel = {
  addReview,
  getReviewsByInventoryId,
};

export default invModel;