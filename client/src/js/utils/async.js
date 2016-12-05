import axios from 'axios';
import { partial, resolveThrough, rejectThrough } from 'fun-util';

import logger from './logger';

axios.interceptors.request.use(config => {
  logger.log(config);
  return config;
});

axios.interceptors.response.use(
  resolveThrough(logger.log),
  rejectThrough(logger.error));

export default axios;
