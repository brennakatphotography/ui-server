const route = require('express').Router();

route.use('/', require('./static'));

route.use('/', require('./html'));

module.exports = route;
