const ENV = {};

export default VARS => {
  ENV.VARS = {...VARS};
};

export const getENV = key => (ENV.VARS || {})[key] || '';
