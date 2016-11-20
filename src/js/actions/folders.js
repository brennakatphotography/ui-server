import async from '../utils/async';
import { FOLDERS_ENDPOINT } from '../const/endpoints';
import { RECEIVE_FOLDERS } from '../const/actionTypes';

export const getPublicFolders = () => dispatch => {
  return async.get(FOLDERS_ENDPOINT).then(({ data }) => {
    dispatch({ type: RECEIVE_FOLDERS, folders: data.data });
  }).catch(console.error);
};
