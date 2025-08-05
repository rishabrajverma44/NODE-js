import { model, Schema } from "mongoose";

const ApplicantsSchema = new Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    formDetails: {
      userId: String,
      formID: String,
      status: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const AppliedForms = model("AppliedForms", ApplicantsSchema);
