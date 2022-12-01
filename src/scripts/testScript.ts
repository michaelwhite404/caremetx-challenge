import { closeDB, openDB } from "../db";
import { Patient } from "../models";
import { addDays } from "../utils";

const main = async () => {
  await openDB();
  const data = await Patient.aggregate([
    { $match: { consent: "Y" } },
    {
      $lookup: {
        from: "emails",
        localField: "_id",
        foreignField: "patient",
        as: "emails",
      },
    },
  ]);
  console.log(data.every((patient) => patient.emails.length === 4));
  await closeDB();
};

main();
