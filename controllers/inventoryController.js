const inventoryModel = require('../models/inventory-model'); // provides getAllInventory, getInventoryById, getInventoryByType
const utilities = require('../utilities'); // provides buildVehicleDetailHTML

// Define a mapping for car types to images
const carImages = {
  suv: [
    { thumb: 'escalade-tn.jpg', full: 'escalade.jpg' },
    { thumb: 'hummer-tn.jpg', full: 'hummer.jpg' },
    { thumb: 'wrangler-tn.jpg', full: 'wrangler.jpg' },
  ],
  sedan: [
    { thumb: 'crwn-vic-tn.jpg', full: 'crwn-vic.jpg' },
    { thumb: 'model-t-tn.jpg', full: 'model-t.jpg' },
  ],
  truck: [
    { thumb: 'fire-truck-tn.jpg', full: 'fire-truck.jpg' },
    { thumb: 'monster-truck-tn.jpg', full: 'monster-truck.jpg' },
  ],
  coupe: [
    { thumb: 'aventador-tn.jpg', full: 'aventador-try.jpg' },
    { thumb: 'camaro-tn.jpg', full: 'camaro.jpg' },
    { thumb: 'aerocar-tn.jpg', full: 'aerocar-try.jpg' },
    { thumb: 'batmobile-tn.jpg', full: 'batmobile-try.jpg' },
    { thumb: 'delorean-tn.jpg', full: 'deforean.jpg' },
    { thumb: 'dog-car-tn.jpg', full: 'dog-car.jpg' },
  ],
  van: [
    { thumb: 'mystery-van-tn.jpg', full: 'mystery-van.jpg' },
    { thumb: 'survan-tn.jpg', full: 'survan.jpg' },
  ]
};

// Home page
async function getHome(req, res, next) {
  try {
    res.render('home', { title: 'Welcome to Inventory App' });
  } catch (err) {
    next(err);
  }
}

// List all inventory
async function listAll(req, res, next) {
  try {
    const inventory = await inventoryModel.getAllInventory();
    res.render('inventory/classification', { title: 'All Inventory', inventory });
  } catch (err) {
    next(err);
  }
}

// List inventory by type (SUV, Truck, Sedan, etc.)
async function listByType(req, res, next) {
  try {
    const type = req.params.type?.toLowerCase() || '';
    if (!carImages[type]) {
      return res.status(404).render('errors/error', { message: 'Vehicle type not found', status: 404 });
    }

    // For demo purposes, we can either use the images map or query database
    // const inventory = await inventoryModel.getInventoryByType(type);
    const inventory = carImages[type];

    res.render('inventory/classification', {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Inventory`,
      inventory,
      type
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error fetching inventory by type");
  }
}

// Vehicle details by ID
async function getVehicleDetails(req, res, next) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(404).render('errors/error', { message: 'Invalid vehicle id', status: 404 });
  }
  try {
    const vehicle = await inventoryModel.getInventoryById(id);
    if (!vehicle) {
      return res.status(404).render('errors/error', { message: 'Vehicle not found', status: 404 });
    }
    const detailHTML = utilities.buildVehicleDetailHTML(vehicle);
    res.render('inventory/detail', {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicle,
      detailHTML
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHome, listAll, listByType, getVehicleDetails };