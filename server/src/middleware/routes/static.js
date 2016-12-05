const express = require('express'), route = express.Router();
const path = require('path');

route.use('/js', express.static(path.join(__dirname, '../../../../client/dist/js')));

route.use('/css', express.static(path.join(__dirname, '../../../../client/dist/css')));

module.exports = route;
