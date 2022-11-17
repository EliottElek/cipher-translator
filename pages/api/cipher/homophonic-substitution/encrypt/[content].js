// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { homophonicCipherEncrypt } from "../../../../../utils/ciphers/homophonic-substitution";
export default function handler(req, res) {
  const { content, word } = req.query;
  //removing content and word from key
  const key = req.query;
  delete key.content;
  delete key.word;

  const result = homophonicCipherEncrypt(content, key, word);
  res.status(200).json({ result: result, key: key });
}
