const route = require('express').Router();

route.use('/', require('./static'));

module.exports = route;
