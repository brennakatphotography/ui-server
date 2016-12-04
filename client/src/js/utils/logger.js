export default ({ dispatch }) => next => action => {
  console.log('dispatched action:', action);
  return next(action);
};
