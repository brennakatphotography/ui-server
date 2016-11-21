const route = require('express').Router();

route.use('/photos', require('./photos'));

module.exports = route;
