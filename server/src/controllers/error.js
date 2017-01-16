module.exports = (error, request, response, next) => {
  console.error('an error ocurred:', error);
  response
    .status(error.status || 500)
    .json({ error: error.error || error.message || error });
};
