import { RECEIVE_FOLDERS } from '../const/actionTypes';

export const folders = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return action.folders;
    default:
      return state;
  }
};
