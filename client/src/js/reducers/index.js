import { combineReducers } from 'redux';
import { bannerImages } from './images';
import { folders } from './folders';

export default reducers => {
  return combineReducers({
    ...reducers,
    bannerImages,
    folders
  });
};
