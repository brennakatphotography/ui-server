const API = '/api/v1';
const BIN = '/bin/v1';

export const PHOTOS_ENDPOINT = `${BIN}/photos`;
export const FOLDERS_ENDPOINT = `${API}/folders`;

export const BANNER_FOLDER = `${FOLDERS_ENDPOINT}?name=banner`;
export const PUBLIC_FOLDER = `${FOLDERS_ENDPOINT}?name=public`;
