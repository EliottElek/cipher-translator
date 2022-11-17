As Caesar cipher and a modified version of Caesar cipher is easy to break, monoalphabetic cipher comes into the picture. In monoalphabetic, each alphabet in plain text can be replaced by any other alphabet except the original alphabet. That is, A can be replaced by any other alphabet from B to Z. B can be replaced by A or C to Z. C can be replaced by A, B, and D to z, etc. Mono alphabetic cipher causes difficulty to crack the message as there are random substitutions and a large number of permutation and combination are available.

# How to code it in Javascript

```js
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
export const monoAlphabeticCipherEncrypt = (content, key) => {
  const keyArray = key.split("");
  const result = [];
  // key is something like : lvqcpidmfoabwnjutghszeyxkr
  // for each letter, let's find the position of it in the key
  content
    .toLowerCase()
    .split("")
    .forEach((letter) => {
      if (letter.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
        result.push(letter);
      else {
        const keyPos = keyArray.findIndex((k) => k === letter);
        // find position of this key inr regular alphabet
        result.push(alphabet[keyPos]);
      }
    });
  return result.join("");
};
export const monoAlphabeticCipherDecrypt = (content, key) => {
  const result = [];
  // key is something like : lvqcpidmfoabwnjutghszeyxkr
  // for each letter, let's find the position of it in the key
  content
    .toLowerCase()
    .split("")
    .forEach((letter) => {
      if (letter.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
        result.push(letter);
      else {
        const keyPos = alphabet.findIndex((k) => k === letter);
        // find position of this key inr regular alphabet
        result.push(key[keyPos]);
      }
    });
  return result.join("");
  return content;
};

export const generateRandomAlphabet = () => {
  const newAlphabet = [...alphabet];
  return shuffleArray(newAlphabet).join("");
};
export const keyCheck = (key) => {
  if (key.length !== 26)
    return {
      success: false,
      message: "The length of the key must be 26 characters long.",
    };
  let dupChars = key.split("").filter((element, index) => {
    return key.indexOf(element) !== index;
  });
  if (dupChars.length > 0)
    return {
      success: false,
      message:
        "Looks like the following letter have doublon : " + dupChars.join(", "),
    };
  return {
    success: true,
    message: null,
  };
};
```
