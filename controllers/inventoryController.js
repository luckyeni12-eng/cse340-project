// controllers/inventoryController.js
const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities');

async function buildByInventoryId(req, res, next) {
  try {
    const invId = parseInt(req.params.inv_id, 10);
    if (Number.isNaN(invId)) {
      const err = new Error('Invalid inventory id');
      err.status = 400;
      throw err;
    }

    const vehicle = await inventoryModel.getVehicleById(invId);
    if (!vehicle) {
      res.status(404);
      return res.render('errors/error', {
        title: '404 - Not Found',
        message: `No vehicle found with id ${invId}.`,
        status: 404,
      });
    }

    // build HTML wrapper using utility function (task requirement)
    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle);

    // Render the detail view. The view will use the vehicle object and the HTML snippet.
    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  buildByInventoryId,
};
