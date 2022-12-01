import { closeDB, openDB } from "../db";
import { Email, Patient } from "../models";

beforeAll(async () => await openDB());
afterAll(async () => await closeDB());

describe("CareMetX challenge tests", () => {
  it("Verify the data in flat file matches the data in Patients collection.", () => {
    throw new Error("Test Not Implemented");
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
        },
      },
    ]);
    // Each patient should have 4 emails
    expect(data.every((patient) => patient.emails.length === 4)).toBe(true);
  });
});
