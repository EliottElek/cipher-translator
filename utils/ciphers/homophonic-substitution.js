export const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export const generateKeyTable = (wordInput) => {
  const values = [...Array(26 * wordInput.length)].map((n, i) => i + 1);

  const word = wordInput.split("");
  const tab = [];
  var vals = [...values];
  word.forEach((letter, i) => {
    tab[i] = { letter: letter, children: [] };
    tab[i].children = [];
    alphabet.forEach((j) => {
      // get a single value from list, then remove it from it
      var index = Math.floor(Math.random() * vals.length);
      tab[i].children.push(
        `${vals[index]}${alphabet[Math.floor(Math.random() * alphabet.length)]}`
      );
      vals.splice(index, 1);
    });
  });
  return tab;
};

export const homophonicCipherEncrypt = (content, key) => {
  let encrypted = [];
  content = content.toLowerCase().split("");
  for (let k = 0; k < content.length; k++) {
    // for evey letter of the content
    // if (content[k] === " ") encrypted.push(" ");
    if (content[k].match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
      encrypted.push(content[k]);
    // else we find the letter
    else {
      const letterIndex = alphabet.findIndex((al) => al === content[k]);
      encrypted.push(key[`key[${0}][children][${letterIndex}]`]);
    }
  }

  return encrypted.join("");
};
export const homophonicCipherDecrypt = (content, key, word) => {
  let decrypted = [];
  // content = content.toLowerCase().split("");
  console.log(content);
  for (let k = 0; k < content.length; k++) {
    // for evey letter of the content
    // if (content[k] === " ") decrypted.push(" ");
    if (content[k].match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/))
      decrypted.push(content[k]);
    // else we find the letter
    else {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
          if (content.includes(key[`key[${i}][children][${j}]`])) {
            decrypted.push(alphabet[j]);
          }
        }
      }
    }
  }

  return decrypted.join("");
};
