const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { check, validationResult } = require('express-validator');

// Management view
router.get('/', inventoryController.managementView);

// Add Classification
router.get('/add-classification', inventoryController.addClassificationView);
router.post(
  '/add-classification',
  // Server-side validation
  check('classification_name')
    .trim()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('Classification name cannot contain spaces or special characters.')
    .notEmpty()
    .withMessage('Classification name is required'),
  inventoryController.addClassification
);

// Add Inventory
router.get('/add-inventory', inventoryController.addInventoryView);
router.post(
  '/add-inventory',
  // Server-side validation
  [
    check('inv_make').trim().notEmpty().withMessage('Make is required'),
    check('inv_model').trim().notEmpty().withMessage('Model is required'),
    check('inv_year').isInt({ min: 1900, max: 2100 }).withMessage('Enter a valid year'),
    check('inv_price').isFloat({ min: 0 }).withMessage('Enter a valid price'),
    check('classification_id').notEmpty().withMessage('Select a classification'),
  ],
  inventoryController.addInventory
);

module.exports = router;