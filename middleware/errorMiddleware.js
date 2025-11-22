// middleware/errorMiddleware.js
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.error(err.stack);

  res.status(status);
  // Render an error view that meets the frontend checklist (accessible, clear)
  res.render('errors/error', {
    title: `${status} - ${status === 404 ? 'Not Found' : 'Server Error'}`,
    message: err.message || 'An unexpected error occurred.',
    status,
  });
};
