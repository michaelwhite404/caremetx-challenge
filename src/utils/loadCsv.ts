import fs from "fs";

export const loadCsv = (fileName: string) => {
  const raw = fs.readFileSync(fileName);
  const file = raw.toString("utf-8");
  return file;
};
