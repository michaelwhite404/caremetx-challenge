import { csvToJson, loadCsv } from "../utils";
import path from "path";

const main = () => {
  const csv = loadCsv(path.resolve(__dirname, "../../data.csv"));
  const arr = csvToJson(csv, { delimeter: "|" });
};

main();
