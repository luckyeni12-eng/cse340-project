// routes/inventoryRoutes.js
const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")
const { body } = require("express-validator")

router.get("/", inventoryController.showManagement)

router.get("/type/:type", inventoryController.listByType)

router.get("/detail/:invId", inventoryController.vehicleDetail)

router.get("/add-classification", inventoryController.buildAddClassification)
router.post(
  "/add-classification",
  body("classification_name")
    .trim()
    .notEmpty().withMessage("Classification name is required.")
    .isLength({ max: 50 }).withMessage("Maximum 50 characters.")
    .matches(/^[A-Za-z0-9]+$/).withMessage("No spaces or special characters."),
  inventoryController.handleAddClassification
)

router.get("/add-inventory", inventoryController.buildAddInventory)
router.post(
  "/add-inventory",
  body("classification_id").notEmpty().withMessage("Classification required."),
  body("inv_make").notEmpty().withMessage("Make required."),
  body("inv_model").notEmpty().withMessage("Model required."),
  body("inv_year").isInt({ min: 1900, max: 2100 }).withMessage("Invalid year."),
  body("inv_description").notEmpty().withMessage("Description required."),
  body("inv_price").isFloat({ min: 0 }).withMessage("Invalid price."),
  body("inv_image").notEmpty().withMessage("Image required."),
  body("inv_thumbnail").notEmpty().withMessage("Thumbnail required."),
  inventoryController.handleAddInventory
)

module.exports = router