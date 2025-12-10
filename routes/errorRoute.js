// routes/errorRoute.js
const express = require('express');
const router = express.Router();

// Intentional 500 Error
router.get('/trigger-error', (req, res, next) => {
  const err = new Error('This is an intentional server error');
  err.status = 500;
  next(err);
});

module.exports = router;