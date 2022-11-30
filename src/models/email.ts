import { model, Schema, Types } from "mongoose";

const emailSchema = new Schema({
  name: { type: String, required: true },
  patient: { type: Types.ObjectId, ref: "Patient", required: true },
  scheduled_date: { type: Date, required: true },
});

export const Email = model("Email", emailSchema);
