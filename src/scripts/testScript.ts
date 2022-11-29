import loadCsv from "../utils/loadCsv";
import csvToJson from "../utils/csvToJson";
import path from "path";

const main = () => {
  const csv = loadCsv(path.resolve(__dirname, "../../data.csv"));
  const arr = csvToJson(csv, { delimeter: "|" });
};

main();
