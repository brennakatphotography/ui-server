import { combineReducers } from 'redux';
import { connect } from 'react-redux';

import group from '../app/group/reducers';
import main from '../app/main/reducers';

export const connectStore = connect(store => store);

export const makeStore = reducers => combineReducers({
  ...group,
  ...main,
  ...reducers
});

export default {
  connectStore,
  makeStore
};
