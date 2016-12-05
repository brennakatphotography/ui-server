import logger from './logger';

export default error => {
  logger.error('An error occurred:', error);
};
