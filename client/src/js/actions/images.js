import async from '../utils/async';
import { BANNER_FOLDER } from '../const/endpoints';
import { RECEIVE_BANNER_FOLDER } from '../const/actionTypes';

export const getMainScrollerImages = () => dispatch => {
  return async.get(BANNER_FOLDER).then(({ data }) => {
    dispatch({ type: RECEIVE_BANNER_FOLDER, folder: data.data });
  }).catch(console.error);
};
