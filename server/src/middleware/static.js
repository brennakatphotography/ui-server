const express = require('express'), route = express.Router();
const path = require('path');

route.use('/', express.static(path.join(__dirname, '../../../client/dist')));

module.exports = route;
