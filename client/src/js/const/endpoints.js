const API = '/api/v1';
const BIN = '/bin/v1';

export const FOLDERS_ENDPOINT = `${API}/folders`;
export const PHOTOS_ENDPOINT = `${BIN}/photos`;

export const BANNER_FOLDER = `${FOLDERS_ENDPOINT}?name=banner`;
export const IMAGE_GROUPS = `${FOLDERS_ENDPOINT}?name=groups`;
export const PUBLIC_FOLDER = `${FOLDERS_ENDPOINT}?name=public`;

export const photoSrc = (id, type) => {
  let endpoint = `${PHOTOS_ENDPOINT}/${id}`;
  if (type) {
    return `${endpoint}?type=${type}`;
  }
  return endpoint;
};

export const groupRoute = id => `/groups/${id}`;
