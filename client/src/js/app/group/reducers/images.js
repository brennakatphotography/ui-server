import { CLEAR_IMAGES, RECEIVE_IMAGES } from '../../../const/actionTypes';

export const images = (state = [], { type, images }) => {
  switch (type) {
    case CLEAR_IMAGES:
      return [];
    case RECEIVE_IMAGES:
      return images;
    default:
      return state;
  }
};
