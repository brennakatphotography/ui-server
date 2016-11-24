const interceptors = [
  require('cookie-parser')(),
  require('./ajax')
];

const cbNext = (request, response, next, interceptors) => (...args) => {
  if (args.length) {
    return next(...args);
  }
  incept(interceptors.slice(1))(request, response, next)
};

const incept = interceptors => (request, response, next) => {
  switch (interceptors.length) {
    case 0:
      return next();
    default:
      interceptors[0](request, response, cbNext(request, response, next, interceptors));
  }
};

module.exports = (request, response, next) => {
  incept(interceptors)(request, response, next);
};
