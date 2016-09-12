import { combineReducers } from 'redux';

export default reducers => {
  return combineReducers({
    ...reducers
  });
};
