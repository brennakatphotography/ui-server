var express = require('express'), route = express.Router();
var { STATIC_FOLDER } = process.env;

route.use(express.static(STATIC_FOLDER));

route.use('/*', express.static(`${STATIC_FOLDER}/index.html`));

module.exports = route;