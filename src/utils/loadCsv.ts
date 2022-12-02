import fs from "fs";

export const loadCsv = (path: string) => {
  const raw = fs.readFileSync(path);
  const file = raw.toString("utf-8");
  return file;
};
