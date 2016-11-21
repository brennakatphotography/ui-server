const route = require('express').Router();

route.use('/', (err, request, response, next) => {
  console.error(err);
  response.status(err.status || 500).json({ err });
});

module.exports = route;
