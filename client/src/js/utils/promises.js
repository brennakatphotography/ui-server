import { getIn } from 'fun-util';

export const thenGetIn = (...args) => data => getIn(data, ...args);
