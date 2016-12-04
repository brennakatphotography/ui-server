import async, { groupRoute } from '../utils/async';
import { BANNER_FOLDER, FOLDERS_ENDPOINT, photoSrc } from '../const/endpoints';
import { RECEIVE_BANNER_FOLDER, RECEIVE_GROUPS } from '../const/actionTypes';
import { thenGetIn } from '../utils/promises';

export const getMainScrollerImages = () => dispatch => {
  return async.get(BANNER_FOLDER).then(({ data }) => {
    dispatch({ type: RECEIVE_BANNER_FOLDER, folder: data.data });
  }).catch(console.error);
};

export const getThumbnails = folders => dispatch => {
  return Promise.all(folders.map(({ description, id: folderId, name }) => {
    const page = groupRoute(folderId);
    return async.get(`${FOLDERS_ENDPOINT}/${folderId}`)
      .then(thenGetIn('data', 'data', 'photos', 0, 'id'))
      .then(imageId => photoSrc(imageId, 'thumbnail'))
      .then(src => ({ description, name, page, src }));
  })).then(groups => {
    dispatch({ type: RECEIVE_GROUPS, groups });
  });
};
