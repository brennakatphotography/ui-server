const express = require('express'), route = express.Router();
const path = require('path');

['/js', '/css'].forEach(dir => {
  let filePath = path.join(__dirname, `../../../client/build${dir}`);
  route.use(dir, express.static(filePath));
});

module.exports = route;
