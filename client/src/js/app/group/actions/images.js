import async from '../../../utils/async';
import { FOLDERS_ENDPOINT, photoSrc } from '../../../const/endpoints';
import { errorHandler } from '../../../utils';
import { CLEAR_IMAGES, RECEIVE_IMAGES } from '../../../const/actionTypes';
import { thenGetIn } from '../../../utils/promises';

export const getGroupImages = id => dispatch => {
  dispatch({ type: CLEAR_IMAGES });
  return async.get(`${FOLDERS_ENDPOINT}/${id}`)
    .then(thenGetIn('data', 'data', 'photos'))
    .then(mapPhotos)
    .then(images => {
      dispatch({ type: RECEIVE_IMAGES, images });
    }).catch(errorHandler);
};

const mapPhotos = photos => photos.map(({ id, name, description }) => {
  return {
    description,
    name,
    src: photoSrc(id)
  };
});
