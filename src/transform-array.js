const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }
  if (arr.length === 0) return arr;
  if (!arr.find((elem) => String(elem).match(/--\w+-\w+/))) return arr;
  let transformed = arr.slice();
  for (let i = 0; i < transformed.length; i += 1) {
    if (String(arr[i]).match(/--\w+-\w+/)) {
      const todo = arr[i];
      if (todo === '--discard-next' && i !== transformed.length - 1) {
        transformed.splice(i + 1, 1, '');
      }
      if (todo === '--discard-prev' && i !== 0) {
        transformed.splice(i  - 1, 1, '');
      }
      if (todo === '--double-next' && i !== transformed.length - 1) {
        transformed.splice(i + 1, 0, transformed[i + 1]);
      }
      if (todo === '--double-prev' && i !== 0) {
        transformed.splice(i, 0, transformed[i - 1]);
      }
    }
  }
  transformed = transformed.filter((elem) => elem !== '');
  transformed = transformed.filter((elem) => elem !== '--double-prev');
  transformed = transformed.filter((elem) => elem !== '--double-next');
  transformed = transformed.filter((elem) => elem !== '--discard-prev');
  transformed = transformed.filter((elem) => elem !== '--discard-next');
  return transformed
}

module.exports = {
  transform
};
