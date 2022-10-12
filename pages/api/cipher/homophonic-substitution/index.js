import fs from "fs";
import { join } from "path";

export default async function handler(req, res) {
  try {
    const postFilePath = join(
      __dirname,
      `../../../../../pages/api/cipher/homophonic-substitution/content.md`
    );
    const fileContents = fs.readFileSync(postFilePath, "utf8");
    res.status(200).json({ content: fileContents });
  } catch (e) {
    res.status(404);
  }
}
