import { RECEIVE_FOLDERS, RECEIVE_GROUPS } from '../const/actionTypes';

export const folders = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FOLDERS:
      return action.folders;
    default:
      return state;
  }
};

export const groups = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_GROUPS:
      return action.groups;
    default:
      return state;
  }
};
