import { combineReducers } from 'redux';
import { bannerImages } from './images';
import { folders, groups } from './folders';

export default reducers => {
  return combineReducers({
    ...reducers,
    bannerImages,
    folders,
    groups
  });
};
