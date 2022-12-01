import pluralize from "pluralize";
import { closeDB, openDB } from "../db";
import { Patient } from "../models";

const consentMissingEmails = async () => {
  openDB();
  const patients = await Patient.find({ $and: [{ emailAddress: "" }, { consent: "Y" }] });
  console.log(
    `There ${pluralize("are", patients.length)} ${pluralize(
      "patients",
      patients.length,
      true
    )} that consented but does not have an email.`
  );
  if (patients.length > 0) {
    console.log("IDs:", patients.map((patient) => patient.memberId).join(", "));
  }
  closeDB();
};

consentMissingEmails();
