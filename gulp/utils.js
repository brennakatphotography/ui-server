const { ifn } = require('fun-util');
const { noop } = require('gulp-util');

const buildOnly = (condition, action, ...args) => {
  return ifn(() => condition, action, noop)(...args);
};

const errorReporter = ({ build }) => {
  return function (error) {
    console.error(error);
    if (build) {
      process.exit(1);
    }
    this.emit('end');
  };
};

const getArg = flag => {
  let arg = process.argv.find(arg => arg.match(new RegExp(`^--${flag}`)));
  let string = arg || '';
  return string.split('=')[1];
};

const logIf = (executor, ...messages) => {
  const logs = messages.map(message => message.trim()).filter(Boolean);
  if (logs.length) {
    console.log(`[ ${executor} ]:`, ...logs);
  }
};

module.exports = {
  buildOnly,
  errorReporter,
  getArg,
  logIf
};
