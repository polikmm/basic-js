const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(boolean = true) {
    this.modification = boolean;
  }
  encrypt(message, key) {
    if (arguments.length < 2) {
      throw new Error("Incorrect arguments!");
    }
    if (typeof arguments[0] !== 'string' || typeof arguments[1] !== 'string') {
      throw new Error("Incorrect arguments!");
    }
    let coded = '';
    const str = message.toUpperCase().split(' ').join('');
    const code =  key.length < message.length
      ? key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length).toUpperCase()
      : key.toUpperCase();
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < str.length; i += 1) {
      const currentIndex = alphabet.indexOf(str[i]);
      const letterIndex = alphabet.indexOf(code[i]);
      let newLetterIdx = 0;
      let symbol = '';
      if (currentIndex !== -1 && letterIndex !== -1) {
        if (currentIndex + letterIndex > alphabet.length) newLetterIdx = currentIndex + letterIndex - alphabet.length;
        if (currentIndex + letterIndex < alphabet.length) newLetterIdx = currentIndex + letterIndex;
        if (currentIndex + letterIndex === alphabet.length) newLetterIdx = 0;
        symbol = alphabet[newLetterIdx]; 
      } else if (i === str.length - 1 && i !== code.length - 1 && letterIndex !== -1) {
        newLetterIdx = currentIndex - code.slice(i).length;
        symbol = alphabet[newLetterIdx];
      } else {
        symbol = str[i];
      }
        coded = `${coded}${symbol}`;
    }
    if (!this.modification) coded = coded.split('').reverse();
    if (this.modification) coded = coded.split('');
    const len = message.split(' ').map((word) => word.length);
    return len.reduce((acc, num) => acc += ` ${coded.splice(0, num).join('')}`, '')
      .trim();
  }
  decrypt(encryptedMessage, key) {
    if (arguments.length < 2) {
      throw new Error("Incorrect arguments!");
    }
    if (typeof arguments[0] !== 'string' || typeof arguments[1] !== 'string') {
      throw new Error("Incorrect arguments!");
    }
    let encoded = '';
    const str = encryptedMessage.toUpperCase().split(' ').join('');
    const code =  key.length < encryptedMessage.length
      ? key.repeat(Math.ceil(str.length / key.length)).slice(0, str.length).toUpperCase()
      : key.toUpperCase();
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < str.length; i += 1) {
      const currentIndex = alphabet.indexOf(str[i]);
      const letterIndex = alphabet.indexOf(code[i]);
      let newLetterIdx = 0;
      let symbol = '';
      if (currentIndex !== -1 && letterIndex !== -1) {
        if (currentIndex - letterIndex < 0) newLetterIdx = alphabet.length - (letterIndex - currentIndex);
        if (currentIndex - letterIndex >= 0) newLetterIdx = currentIndex - letterIndex;
        symbol = alphabet[newLetterIdx]; 
      } else if (i === str.length - 1 && i !== code.length - 1 && letterIndex !== -1) {
        newLetterIdx = currentIndex - code.slice(i).length;
        symbol = alphabet[newLetterIdx];
      } else {
        symbol = str[i];
      }
        encoded = `${encoded}${symbol}`;
    }
    if (!this.modification) encoded = encoded.split('').reverse();
    if (this.modification) encoded = encoded.split('');
    const len = encryptedMessage.split(' ').map((word) => word.length);
    return len.reduce((acc, num) => acc += ` ${encoded.splice(0, num).join('')}`, '')
      .trim();
  }
}

module.exports = {
  VigenereCipheringMachine
};
