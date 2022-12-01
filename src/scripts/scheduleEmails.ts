import { closeDB, openDB } from "../db";
import { Email, Patient } from "../models";
import { addDays } from "../utils";

const scheduleEmails = async () => {
  await openDB();
  const consentingPatients = await Patient.find({ consent: "Y" });
  const emailsToAdd: any[] = [];
  const now = new Date();
  consentingPatients.forEach((patient) => {
    [1, 2, 3, 4].forEach((num) => {
      emailsToAdd.push({
        name: `Day ${num}`,
        patient,
        scheduled_date: addDays(now, num),
      });
    });
  });
  const emails = await Email.create(emailsToAdd);
  console.log(`${emails.length} email${emails.length > 1 ? "s" : ""} added!`);
  await closeDB();
};

scheduleEmails().catch(console.log);
