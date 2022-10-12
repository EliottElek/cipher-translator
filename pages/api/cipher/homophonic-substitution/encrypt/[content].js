// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { homophonicCipherEncrypt } from "../../../../../utils/ciphers/homophonic-substitution";
export default function handler(req, res) {
  const { content } = req.query;
  const result = homophonicCipherEncrypt(content);
  res.status(200).json({ result: result, params: req.query });
}
