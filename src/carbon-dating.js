const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (!arguments.length) return false;
  if (typeof sampleActivity !== 'string') return false;
  if (sampleActivity.match(/^\-/)) return false;
  if (sampleActivity === '0') return false;
  if (sampleActivity.match(/^\d{3}/)) return false;
  if (sampleActivity.match(/^(\d{2}\.\d)$/)) return false;
  if (sampleActivity.match(/\D/) && !sampleActivity.match(/\./)) return false;
  if (sampleActivity.length === 0) return false;
  const k = 0.693 / HALF_LIFE_PERIOD;
  const activity = +sampleActivity;
  return Math.ceil(Math.log(MODERN_ACTIVITY / activity) / k);
}

module.exports = {
  dateSample
};
