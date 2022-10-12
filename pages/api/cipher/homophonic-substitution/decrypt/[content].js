// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { homophonicCipherDecrypt } from "../../../../../utils/ciphers/homophonic-substitution";
export default function handler(req, res) {
  const { content, key } = req.query;
  const result = homophonicCipherDecrypt(content, key);
  res.status(200).json({ result: result });
}
