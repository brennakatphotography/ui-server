const path = require('path');
const route = require('express').Router();
const { GULP } = process.env;

route.get('/', (request, response, next) => {
  const devHTML = path.join(__dirname, '../../../../client/dist/dev.html');
  if (GULP) {
    response.sendFile(devHTML);
  } else {
    next();
  }
});

module.exports = route;
