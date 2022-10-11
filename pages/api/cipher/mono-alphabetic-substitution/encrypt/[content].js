// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { monoAlphabeticCipherEncrypt } from "../../../../../utils/ciphers/mono-alphabetic";
export default function handler(req, res) {
  const { content, key } = req.query;
  const result = monoAlphabeticCipherEncrypt(content, key);
  res.status(200).json({ result: result });
}
