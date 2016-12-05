import { RECEIVE_BANNER_FOLDER } from '../../../const/actionTypes';

export const bannerImages = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_BANNER_FOLDER:
      return action.folder.photos;
    default:
      return state;
  }
};
