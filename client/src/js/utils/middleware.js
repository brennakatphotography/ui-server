import logger from './logger';

const dispatchMiddleware = ({ dispatch }) => next => action => {
  if (typeof action === 'function') return action(dispatch);
  return next(action);
};

const loggerMiddleware = ({ dispatch }) => next => action => {
  logger.log('dispatched action:', action);
  return next(action);
};

export default [
  dispatchMiddleware,
  loggerMiddleware
];
