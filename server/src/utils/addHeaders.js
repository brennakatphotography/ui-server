module.exports = token => {
  let Authorization = `Bearer ${token || process.env.DEV_TOKEN || ''}`;
  if (Authorization.length > 7) {
    return { Authorization };
  }
  return {};
};
