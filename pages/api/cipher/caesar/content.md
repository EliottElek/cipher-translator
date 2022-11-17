In Caesar cipher, the set of plain text characters is replaced by any other character, symbols or numbers. It is a very weak technique of hiding text. In Caesar’s cipher, each alphabet in the message is replaced by three places down. Let’s see one example. The plain text is EDUCBA. As a Caesar cipher, each alphabet is replaced by three-place down so that E will replace by H, D will replace by G, U will replace by X, C will replace by F, B will replace by E, and A will replace by D. So here the plain text is EDUCBA and ciphertext Is HGXFED.

Caesar cipher algorithm is as follows:

- Read each alphabet of plain text.
- Replace each alphabet with 3 places down.
- Repeat the process for all alphabet in plain text.
  A Modified Version of Caesar Cipher: This cipher works the same as Caesar cipher; the only difference is in Caesar cipher, each alphabet is replaced by three-place down wherein a modified version of Caesar cipher, a user decides the number to replace the alphabet, and this number will be constant. For example, EDUCBA and number for the replacement are 1, so E will replace by F, D will replace by E, U will replace by V, C will replace by D, B will replace by C, and A will replace by B. So here, the plain text is EDUCBA, and ciphertext Is FEVDCB.

A modified version of the Caesar cipher algorithm is as follows.

Read each alphabet of plain text.
Take the number for replacement.
Replace each alphabet with a specified number down.
Repeat the process for all alphabet in plain text.

## How to mathematically define the Caesar encryption algorithm ?

```js
Enc(k, m) = m + 3 mod (26)
Dec(k, c) = c – 3 mod (26)
k = 3
```

#### Keyed variant of Caesar’s cipher

```js
 Enc(k, m) = m + k mod (26)
 Dec(k, c) = c – k mod (26)
 KeyGen() = k  {0,1,..,25}
```

## How to code it in Javascript

The following codes were highly inspired by [this article](https://blog.stranianelli.com/how-to-code-a-caesar-cipher-in-javascript/#:~:text=It%20is%20a%20type%20of,the%20letter%20A%20becomes%20C%20.).

First, we create two sets of alphabet data, one uppercase and another one in lowercase.

```js
const uppercase = () => 
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "A".charCodeAt())}`);
const lowercase = () =>
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "a".charCodeAt())}`);
```
Then, we know that the `modulo` function is used. So we create it : 

```js
const mod = (a, b) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};
```

Here is the source code : 

```js
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
```