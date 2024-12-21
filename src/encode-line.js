const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  return str.length
    ? str.match(/(.)\1{0,}/g)
      .reduce((acc, elem) => acc = `${acc}${elem.length}${elem[0]}`, '')
      .split('')
      .filter((elem) => elem !== '1')
      .join('')
    : str;
}

module.exports = {
  encodeLine
};
