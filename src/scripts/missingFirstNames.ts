import { closeDB, openDB } from "../db";
import { Patient } from "../models";
import pluralize from "pluralize";
import { bgYellow, yellow } from "chalk";

export const missingFirstNames = async () => {
  await openDB();
  const patients = await Patient.find({ $or: [{ firstName: { $exists: 0 } }, { firstName: "" }] });
  console.log(
    bgYellow.black.bold` ${pluralize("MATCHES", patients.length, true)} `,
    yellow`There ${pluralize("are", patients.length)} ${pluralize(
      "patients",
      patients.length,
      true
    )} with a missing first name.`
  );
  if (patients.length > 0) {
    console.log(
      yellow`Missing first name IDs: ${patients.map((patient) => patient.memberId).join(", ")}`
    );
  }
  await closeDB();
};
