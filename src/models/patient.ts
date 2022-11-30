import { model, Schema } from "mongoose";

const patientSchema = new Schema({
  programIdentifier: { type: String },
  dataSource: { type: String },
  cardNumber: { type: Number },
  memberId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  telephoneNumber: { type: String },
  emailAddress: { type: String },
  consent: { type: String, enum: ["Y", "N"] },
  mobilePhone: { type: String },
});

export const Patient = model("Patient", patientSchema);
