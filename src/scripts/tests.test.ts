import path from "path";
import { closeDB, openDB } from "../db";
import { Email, Patient } from "../models";
import { addDays, csvToJson, loadCsv } from "../utils";

beforeAll(async () => await openDB());
afterAll(async () => await closeDB());

describe("CareMetX challenge tests", () => {
  it("Verify the data in flat file matches the data in Patients collection.", async () => {
    // Get csv data
    const csv = loadCsv(path.resolve(__dirname, "../../data.csv"));
    const data = csvToJson(csv, { delimeter: "|" });
    // Get stored patients
    const patients = await Patient.find({});
    // Find each object as a document in the patients collection
    const allFound = data.every((obj) =>
      patients.find((patient) => patient.memberId === obj.memberId)
    );
    expect(allFound).toBe(true);
  });

  it("Verify Emails were created in Emails Collection for patients who have CONSENT as Y.", async () => {
    const emails = await Email.find({}).populate("patient", "consent");
    // @ts-ignore   -   Each email has the patient consent of "Y"
    expect(emails.every((email) => email.patient.consent === "Y")).toBe(true);
  });

  it("Verify emails for each patient are scheduled correctly.", async () => {
    const data = await Patient.aggregate([
      { $match: { consent: "Y" } },
      {
        $lookup: {
          from: "emails",
          localField: "_id",
          foreignField: "patient",
          as: "emails",
          // sort email by name
          pipeline: [{ $sort: { name: 1 } }],
        },
      },
    ]);
    // Each patient should have 4 emails
    expect(data.every((patient) => patient.emails.length === 4)).toBe(true);
    data.forEach((patient) => {
      // Each day should have date exactly one day after the other
      expect(
        addDays(new Date(patient.emails[0].scheduled_date), 1).getTime() ===
          new Date(patient.emails[1].scheduled_date).getTime()
      ).toBe(true);
      expect(
        addDays(new Date(patient.emails[1].scheduled_date), 1).getTime() ===
          new Date(patient.emails[2].scheduled_date).getTime()
      ).toBe(true);
      expect(
        addDays(new Date(patient.emails[2].scheduled_date), 1).getTime() ===
          new Date(patient.emails[3].scheduled_date).getTime()
      ).toBe(true);
    });
  });
});
