import path from "path";
import { csvToJson, loadCsv } from "../utils";
import { Patient } from "../models";
import { closeDB, openDB } from "../db";

const loadData = async () => {
  await openDB();
  const csv = loadCsv(path.resolve(__dirname, "../../data.csv"));
  const data = csvToJson(csv, { delimeter: "|" });
  const patients = await Patient.create(data);
  console.log(`Data added! ${patients.length} record${patients.length > 1 ? "s" : ""} inserted.`);
  await closeDB();
};

loadData().catch(console.log);
