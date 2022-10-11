const uppercase = () =>
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "A".charCodeAt())}`);
const lowercase = () =>
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "a".charCodeAt())}`);

const mod = (a, b) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

const cipherText = (array, key) => {
  const cipher = {};
  array.forEach((value, index) => {
    cipher[value] = array[mod(index + key, array.length)];
  });
  return cipher;
};

const caesarCipherFunc = (key) => {
  return {
    ...cipherText(uppercase(), key),
    ...cipherText(lowercase(), key),
  };
};

const processCharacter = (cipher, character) =>
  cipher.hasOwnProperty(character) ? cipher[character] : character;

export const caesarCipher = (text, key) => {
  const caesar = caesarCipherFunc(key);
  return [...text].map((c) => processCharacter(caesar, c)).join("");
};
