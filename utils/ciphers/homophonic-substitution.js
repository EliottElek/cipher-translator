export const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const values = [...Array(104)].map((n, i) => i + 1);

export const generateKeyTable = () => {
  const word = "word".split("");
  const tab = [];
  var vals = [...values];
  word.forEach((letter, i) => {
    tab[i] = { letter: letter, children: [] };
    tab[i].children = [];
    alphabet.forEach((j) => {
      // get a single value from list, then remove it from it
      var index = Math.floor(Math.random() * vals.length);
      tab[i].children.push(vals[index]);
      vals.splice(index, 1);
    });
  });
  return tab;
};

export const homophonicCipherEncrypt = (content, key) => {
  return content;
};
export const homophonicCipherDecrypt = (content, key) => {
  return content;
};
