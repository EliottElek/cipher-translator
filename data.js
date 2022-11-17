export const ciphers = [
  {
    name: "Caesar",
    href: "/cipher/caesar",
    slug: "caesar",
    content: `
    In Caesar cipher, the set of plain text characters is replaced by any other character, symbols or numbers. It is a very weak technique of hiding text. In Caesar’s cipher, each alphabet in the message is replaced by three places down. Let’s see one example. The plain text is EDUCBA. As a Caesar cipher, each alphabet is replaced by three-place down so that E will replace by H, D will replace by G, U will replace by X, C will replace by F, B will replace by E, and A will replace by D. So here the plain text is EDUCBA and ciphertext Is HGXFED.    `,
    difficulty: "Easy",
    difficultyColor: "success",
    available: true,
  },
  {
    name: "Monoalphabetic substitution",
    href: "/cipher/mono-alphabetic-substitution",
    slug: "mono-alphabetic-substitution",
    content: `As Caesar cipher and a modified version of Caesar cipher is easy to break, monoalphabetic cipher comes into the picture. In monoalphabetic, each alphabet in plain text can be replaced by any other alphabet except the original alphabet. That is, A can be replaced by any other alphabet from B to Z. B can be replaced by A or C to Z. C can be replaced by A, B, and D to z, etc. Mono alphabetic cipher causes difficulty to crack the message as there are random substitutions and a large number of permutation and combination are available.    `,
    difficulty: "Easy",
    difficultyColor: "success",
    available: true,
  },
  {
    name: "Homophonic substitution",
    slug: "homophonic-substitution",
    href: "/cipher/homophonic-substitution",
    difficulty: "Medium",
    difficultyColor: "warning",
    available: true,
  },
  {
    name: "Polygram substitution",
    href: "/cipher/polygram-substitution",
    difficulty: "Medium",
    difficultyColor: "warning",
    available: false,
  },
  {
    name: "Polyaplphabetic substitution",
    href: "/cipher/polyaplphabetic-substitution",
    difficulty: "Medium",
    difficultyColor: "warning",
    available: false,
  },
  {
    name: "Playfair substitution",
    href: "/cipher/playfair-substitution",
    difficulty: "Difficult",
    difficultyColor: "failure",
    available: false,
  },
  {
    name: "Hill substitution",
    href: "/cipher/hill-substitution",
    difficulty: "Difficult",
    difficultyColor: "failure",
    available: false,
  },
];
export const paths = [
  { params: { cipher: "caesar" } },
  { params: { cipher: "polyaplphabetic-substitution" } },
];

const prod = !true;
export const URL = prod
  ? "https://ciphers-translator.netlify.app"
  : "http://localhost:3000";
