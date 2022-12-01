import pluralize from "pluralize";
import { bgYellow, yellow } from "chalk";

import { closeDB, openDB } from "../db";
import { Patient } from "../models";

export const consentMissingEmails = async () => {
  await openDB();
  const patients = await Patient.find({ $and: [{ emailAddress: "" }, { consent: "Y" }] });
  console.log(
    bgYellow.black.bold` ${pluralize("MATCHES", patients.length, true)} `,
    yellow`There ${pluralize("are", patients.length)} ${pluralize(
      "patients",
      patients.length,
      true
    )} that consented but does not have an email.`
  );
  if (patients.length > 0) {
    console.log(yellow`IDs: ${patients.map((patient) => patient.memberId).join(", ")}`);
  }
  await closeDB();
};
