import { model, Schema } from "mongoose";

const emailSchema = new Schema({
  name: { type: String, required: true },
  scheduled_date: { type: String, required: true },
});

export const Email = model("Email", emailSchema);
