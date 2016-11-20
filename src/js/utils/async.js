import axios from 'axios';
import { getENV } from './env';
import { resolveThrough, rejectThrough } from './promises';

axios.interceptors.request.use(config => {
  return {
    ...config,
    url: getENV('SERVER') + config.url
  };
});

axios.interceptors.response.use(resolveThrough(console.log), rejectThrough(console.error));

export default axios;
