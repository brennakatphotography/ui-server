import { RECEIVE_BANNER_IMAGES } from '../const/actionTypes';

export const bannerImages = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANNER_IMAGES:
      return action.images;
    default:
      return state;
  }
};
