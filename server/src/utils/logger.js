const { Logger } = require('heroku-logger');

module.exports = new Logger({
  readable: false
});