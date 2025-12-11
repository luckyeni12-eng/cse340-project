// controllers/inventoryController.js
const invModel = require("../models/inventory-model")
const reviewModel = require("../models/review-model") // <-- import review model
const utilities = require("../utilities")
const { validationResult } = require("express-validator")

async function showManagement(req, res) {
  res.render("inventory/management", { title: "Inventory Management" })
}

async function listByType(req, res, next) {
  try {
    const type = req.params.type
    const inventory = await invModel.getInventoryByType(type)

    res.render("inventory/classification", {
      title: `${type} Vehicles`,
      inventory
    })
  } catch (err) {
    next(err)
  }
}

async function vehicleDetail(req, res, next) {
  try {
    const invId = req.params.invId
    const vehicle = await invModel.getVehicleById(invId)

    if (!vehicle) {
      return res.status(404).render("inventory/detail", {
        title: "Not Found",
        detailHTML: "<p>Vehicle not found.</p>"
      })
    }

    // ✅ Fetch reviews for this vehicle
    const reviews = await reviewModel.getReviewsByInventoryId(invId)

    res.render("inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      reviews, // send reviews to view
      detailHTML: utilities.buildDetailHTML(vehicle)
    })
  } catch (err) {
    next(err)
  }
}

async function buildAddClassification(req, res) {
  res.render("inventory/add-classification", { title: "Add Classification" })
}

async function handleAddClassification(req, res, next) {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).render("inventory/add-classification", {
        title: "Add Classification",
        errors: errors.array().map(e => e.msg)
      })
    }

    const { classification_name } = req.body
    await invModel.addClassification(classification_name)

    res.redirect("/inv")
  } catch (err) {
    next(err)
  }
}

async function buildAddInventory(req, res, next) {
  try {
    const classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      classificationList
    })
  } catch (err) {
    next(err)
  }
}

async function handleAddInventory(req, res, next) {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const classificationList = await utilities.buildClassificationList(
        req.body.classification_id
      )

      return res.status(400).render("inventory/add-inventory", {
        title: "Add Vehicle",
        classificationList,
        errors: errors.array().map(e => e.msg),
        sticky: req.body
      })
    }

    await invModel.addInventory({
      ...req.body,
      inv_year: Number(req.body.inv_year),
      inv_price: Number(req.body.inv_price),
      inv_miles: Number(req.body.inv_miles || 0)
    })

    res.redirect("/inv")
  } catch (err) {
    next(err)
  }
}

module.exports = {
  showManagement,
  listByType,
  vehicleDetail,
  buildAddClassification,
  handleAddClassification,
  buildAddInventory,
  handleAddInventory
}