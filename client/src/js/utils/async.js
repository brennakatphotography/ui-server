import axios from 'axios';
import { resolveThrough, rejectThrough } from 'fun-util';

axios.interceptors.request.use(config => {
  console.log(config);
  return config;
});

axios.interceptors.response.use(resolveThrough(console.log), rejectThrough(console.error));

export default axios;

export const groupRoute = id => `/groups/${id}`;
