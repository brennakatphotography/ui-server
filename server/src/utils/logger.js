const { Logger } = require('heroku-logger');
const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

const logger = new Logger({
  readable: false
});

const stringify = input => typeof input === 'string' ? input : JSON.stringify(input);

const logData = level => (...args) => {
  const items = args.map(stringify);
  logger[level](items.join(' '));
};

module.exports = LOG_LEVELS.reduce((logger, level) => ({
  ...logger,
  [level]: logData(level)
}), {});