module.exports = (error, request, response, next) => {
  let errorData = joinIfArrayLike(error);
  console.error('an error ocurred:', errorData);
  response
    .status(errorData.status || 500)
    .json({ error: errorData.error || errorData.message || errorData });
};

const joinIfArrayLike = object => {
  try {
    return Array.prototype.join.call(object, '') || object;
  } catch (error) {
    return object;
  }
};