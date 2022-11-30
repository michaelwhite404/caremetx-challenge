import { camalize } from ".";

export const csvToJson = (data: string, options: ParseOptions = { delimeter: "|" }) => {
  const arr = data.split(/\r?\n|\r|\n/g);
  const headers = arr.shift()!.split(options.delimeter).map(camalize);
  const rows = arr.map((row) => row.split(options.delimeter));
  return rows.map((row) => row.reduce((obj, val, i) => ((obj[headers[i]] = val), obj), {} as any));
};

interface ParseOptions {
  delimeter: Delimeter;
}
type Delimeter = "," | "|" | " ";
