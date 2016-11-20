export default ({ dispatch }) => next => action => {
  console.log('dispatched action:');
  console.log(action);
  return next(action);
};
