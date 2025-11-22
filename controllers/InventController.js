const invModel = require('../models/inventoryModel');
const Util = require('../utilities');

exports.managementView = (req, res) => {
  const message = req.flash('message');
  res.render('inventory/management', { title: 'Inventory Management', message });
};

// --- Task 2: Add Classification ---
exports.addClassificationView = (req, res) => {
  const errors = req.flash('errors');
  const message = req.flash('message');
  res.render('inventory/add-classification', { title: 'Add Classification', errors, message });
};

exports.addClassification = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/inv/add-classification');
  }

  const { classification_name } = req.body;

  try {
    await invModel.insertClassification(classification_name);
    req.flash('message', `Classification '${classification_name}' added successfully!`);
    res.redirect('/inv/');
  } catch (err) {
    req.flash('errors', [{ msg: 'Failed to add classification. Try again.' }]);
    res.redirect('/inv/add-classification');
  }
};

// --- Task 3: Add Inventory ---
exports.addInventoryView = async (req, res) => {
  const errors = req.flash('errors');
  const message = req.flash('message');

  // Build classification dropdown
  const classificationList = await Util.buildClassificationList(req.body.classification_id);

  res.render('inventory/add-inventory', {
    title: 'Add Inventory',
    errors,
    message,
    classificationList,
    sticky: req.body || {}
  });
};

exports.addInventory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/inv/add-inventory');
  }

  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    inv_image = '/images/no-image.png',
    inv_thumbnail = '/images/no-image.png'
  } = req.body;

  try {
    await invModel.insertInventory({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_price,
      inv_image,
      inv_thumbnail
    });
    req.flash('message', `Inventory '${inv_make} ${inv_model}' added successfully!`);
    res.redirect('/inv/');
  } catch (err) {
    req.flash('errors', [{ msg: 'Failed to add inventory. Try again.' }]);
    res.redirect('/inv/add-inventory');
  }
};