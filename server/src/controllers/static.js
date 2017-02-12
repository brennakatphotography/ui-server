var express = require('express'), route = express.Router();
var { STATIC_FOLDER } = process.env;

route.use(express.static(STATIC_FOLDER));

module.exports = route;