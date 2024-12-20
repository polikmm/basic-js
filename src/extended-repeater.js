const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let newStr = String(str);
  const times = options.repeatTimes;
  const sep = options.separator || '+';
  const add = options.hasOwnProperty('addition') ? String(options.addition) : options.addition;
  const addTimes = options.additionRepeatTimes;
  const addSep = options.additionSeparator || '|';

  if (!add && !addTimes) {
    for (let i = 1; i < times; i += 1) {
      newStr = `${newStr}${sep}${str}`;
    }
    return newStr;
  }
  if (!addSep && add) {
    for (let i = 1; i < times; i += 1) {
      const additional = add.repeat(addTimes);
      newStr = `${newStr}${additional}${sep}${str}`;
      if (i === times - 1) newStr += `${additional}`;
    }
    return newStr;
  }
  if (!times && !addTimes) {
    newStr = `${newStr}${add}`;
    return newStr;
  }
  if (times && add && addTimes && addSep) {
    const addition = new Array(addTimes * 2 - 1)
      .fill(add)
      .map((elem, idx) => idx % 2 === 1 ? elem = addSep : elem)
      .join('');
      for (let i = 1; i <= times; i += 1) {
        if (i === times) {
          newStr = `${newStr}${addition}`;
        } else {
          newStr = `${newStr}${addition}${sep}${str}`;
        }
      }
      return newStr;
    }
  return `${newStr.repeat(times)}${sep}${newStr.repeat(times)}`;
}

module.exports = {
  repeater
};
