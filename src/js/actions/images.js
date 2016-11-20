import async from '../utils/async';
import { BANNER_IMAGES } from '../const/endpoints';
import { RECEIVE_BANNER_IMAGES } from '../const/actionTypes';

export const getMainScrollerImages = () => dispatch => {
  return async.get(BANNER_IMAGES).then(({ data }) => {
    dispatch({ type: RECEIVE_BANNER_IMAGES, images: data.data.photos });
  }).catch(console.error);
};
