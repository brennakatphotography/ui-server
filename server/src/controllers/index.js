const route = require('express').Router();

route.use('/env.js', require('./env'));

route.use('/', require('./static'));

module.exports = route;
