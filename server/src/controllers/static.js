const express = require('express'), route = express.Router();
const path = require('path');
const { CLIENT_FOLDER } = process.env;

['/js', '/css'].forEach(dir => {
  let filePath = path.join(__dirname, '../../../', CLIENT_FOLDER, `.${dir}`);
  route.use(dir, express.static(filePath));
});

module.exports = route;
