function triggerError(req, res, next) {
  try {
    throw new Error('Intentional 500 error for testing');
  } catch (error) {
    next(error);
  }
}

module.exports = { triggerError };