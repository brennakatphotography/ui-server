module.exports = (error, request, response, next) => {
  console.error('an error ocurred:', error);
  response.status(error.status || 500)
    .json({
      message: error.message || 'An unknown error ocurred'
    });
};
