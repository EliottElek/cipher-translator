// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { caesarCipher } from "../../../../../utils/ciphers/caesar";
export default function handler(req, res) {
  const { content, key } = req.query;
  const result = caesarCipher(content, parseInt(-key));
  res.status(200).json({ result: result });
}
