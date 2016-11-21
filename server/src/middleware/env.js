const path = require('path');
const route = require('express').Router();
const { NODE_ENV } = process.env;

route.get('/', (request, response, next) => {
  const devHTML = path.join(__dirname, '../../../client/dist/dev.html');
  if (NODE_ENV !== 'production') {
    response.sendFile(devHTML);
  } else {
    next();
  }
});

module.exports = route;
