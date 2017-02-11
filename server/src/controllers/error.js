import { silent } from 'fun-util';

module.exports = (error, request, response, next) => {
  console.error('an error ocurred:', joinIfArrayLike(error));
  response
    .status(error.status || 500)
    .json({
      message: error.message || 'An unknown error ocurred',
      success: false
    });
};

const joinIfArrayLike = silent(object => {
  return Array.prototype.join.call(object, '') || object;
});