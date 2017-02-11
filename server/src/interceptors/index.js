const INTERCEPTORS = [
  require('cookie-parser')(),
  require('body-parser').json(),
  require('./ajax'),
  require('./logger')
];

const cbNext = (request, response, next, interceptors) => (...args) => {
  if (args.length) {
    return next(...args);
  }
  incept(interceptors.slice(1))(request, response, next)
};

const incept = interceptors => (request, response, next) => {
  if (interceptors.length) {
    return interceptors[0](request, response, cbNext(request, response, next, interceptors));
  }
  next();
};

module.exports = (request, response, next) => {
  incept(INTERCEPTORS)(request, response, next);
};
