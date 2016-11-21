const route = require('express').Router();

route.use('/', require('./env'));

route.use('/', require('./static'));

route.use('/', require('./err'));

module.exports = route;
