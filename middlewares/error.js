exports.errorHandler = (err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message,
  });
};
exports.notFound = (req, res) => {
  throw new Error("Page not found!");
};
