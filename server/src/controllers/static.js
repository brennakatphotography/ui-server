const express = require('express'), route = express.Router();
const path = require('path');

['/js', '/css'].forEach(extension => {
  let filePath = path.join(__dirname, `../../../client/build${extension}`);
  route.use(extension, express.static(filePath));
});

module.exports = route;
