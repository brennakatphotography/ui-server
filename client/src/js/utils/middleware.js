import logger from './logger';

const dispatchMiddleware = ({ dispatch }) => next => action => {
  return typeof action === 'function' ? action(dispatch) : next(action);
};

const loggerMiddleware = ({ getState }) => next => action => {
  logger.log('Dispatched action:', action);
  let nextAction = next(action);
  logger.log('State after dispatching:', getState());
  return nextAction;
};

export default [
  dispatchMiddleware,
  loggerMiddleware
];
