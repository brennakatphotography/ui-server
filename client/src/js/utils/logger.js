import { partial } from 'fun-util';

const logger = (level, ...messages) => {
  if (window.getEnv().ENV !== 'production') {
    console[level](...messages);
  }
};

export default {
  debug: partial(logger, 'debug'),
  error: partial(logger, 'error'),
  info: partial(logger, 'info'),
  log: partial(logger, 'log'),
  warn: partial(logger, 'warn')
};
