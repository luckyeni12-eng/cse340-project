// routes/index.js
const express = require('express');
const router = express.Router();

// Home
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// About
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Services
router.get('/services', (req, res) => {
  res.render('services', { title: 'Services' });
});

// Contact
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
