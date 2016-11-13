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
  let arg = process.argv.find(arg => arg.match(new RegExp(`^--${flag}`))) || '';
  return arg.split('=')[1];
};

module.exports = {
  buildOnly,
  errorReporter,
  getArg
};
