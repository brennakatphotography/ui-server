const through = method => (...fns) => value => {
  fns.forEach(fn => fn(value));
  return Promise[method](value);
};

export const resolveThrough = through('resolve');

export const rejectThrough = through('reject');
