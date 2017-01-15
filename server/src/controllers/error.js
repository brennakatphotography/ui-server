module.exports = (err, request, response, next) => {
  console.error('an error ocurred:', err);
  response
    .status(err.status || 500)
    .json({ error: err.message || err });
};
