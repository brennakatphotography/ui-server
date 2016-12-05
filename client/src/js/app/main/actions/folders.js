import async from '../../../utils/async';
import { errorHandler } from '../../../utils';
import { FOLDERS_ENDPOINT, IMAGE_GROUPS } from '../../../const/endpoints';
import { getThumbnails } from './images';
import { RECEIVE_FOLDERS } from '../../../const/actionTypes';
import { thenGetIn } from '../../../utils/promises';

export const getPublicFolders = () => dispatch => {
  return async.get(FOLDERS_ENDPOINT)
    .then(thenGetIn('data', 'data'))
    .then(folders => {
      dispatch({ type: RECEIVE_FOLDERS, folders });
    }).catch(errorHandler);
};

export const getGroupFolders = () => dispatch => {
  return async.get(IMAGE_GROUPS)
    .then(thenGetIn('data', 'data', 'sub_folders'))
    .then(groups => {
      dispatch(getThumbnails(groups));
    }).catch(errorHandler);
};
