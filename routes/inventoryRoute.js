// routes/inventoryRoute.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Route to deliver a detail view for any vehicle based on inv_id passed in URL
// Example: GET /inventory/detail/12
router.get('/detail/:inv_id', inventoryController.buildByInventoryId);

module.exports = router;
