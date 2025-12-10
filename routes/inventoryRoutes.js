// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Home page
router.get('/', inventoryController.getHome);

// List ALL inventory
router.get('/inventory', inventoryController.listAll);

// Inventory by classification/type
router.get('/inventory/:type', inventoryController.listByType);

// Vehicle details
router.get('/detail/:id', inventoryController.getVehicleDetails);

module.exports = router;
