import path from "path";
import { bgGreen, green } from "chalk";
import { csvToJson, loadCsv } from "../utils";
import { Patient } from "../models";
import { closeDB, openDB } from "../db";

export const loadData = async () => {
  await openDB();
  const csv = loadCsv(path.resolve(__dirname, "../../data.csv"));
  const data = csvToJson(csv, { delimeter: "|" });
  const patients = await Patient.create(data);
  console.log(
    bgGreen(" SUCCESS "),
    green(`Data added! ${patients.length} record${patients.length > 1 ? "s" : ""} inserted.`)
  );
  await closeDB();
};
