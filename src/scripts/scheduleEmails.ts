import { closeDB, openDB } from "../db";
import { Email, Patient } from "../models";
import { addDays } from "../utils";

const scheduleEmails = async () => {
  openDB();
  const consentingPatients = await Patient.find({ consent: "Y" });
  const emailsToAdd: any[] = [];
  consentingPatients.forEach((patient) => {
    [1, 2, 3, 4].forEach((num) => {
      emailsToAdd.push({
        name: `Day ${num}`,
        patient,
        scheduled_date: addDays(new Date(), num),
      });
    });
  });
  const emails = await Email.create(emailsToAdd);
  console.log(`${emails.length} email${emails.length > 1 ? "s" : ""} added!`);
  closeDB();
};

scheduleEmails().catch(console.log);
