// app.js
const express = require('express');
const path = require('path');
const inventoryRouter = require('./routes/inventoryRoute');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/inventory', inventoryRouter);

// Intentional 500 route (task 3) - goes through a router/controller-like handler
app.get('/cause-error', (req, res, next) => {
  // intentionally create an error to be handled by middleware
  const err = new Error('Intentional 500 test error triggered from /cause-error');
  err.status = 500;
  next(err);
});

// 404 handler - must be after your routes
app.use((req, res, next) => {
  res.status(404);
  res.render('errors/error', {
    title: '404 - Page Not Found',
    message: 'The page you requested could not be found.',
    status: 404,
  });
});

// Error handling middleware (task 2)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
