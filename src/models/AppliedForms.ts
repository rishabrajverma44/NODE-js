import { model, Schema } from "mongoose";
import { IApplied } from "../types";

const ApplicantsSchema = new Schema<IApplied>(
  {
    userID: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      require: true,
    },
    formID: {
      type: String,
      require: true,
    },
    companyID: {
      type: String,
      require: true,
    },
    formStatus: {
      type: String,
      default: "Applied",
      require: true,
    },
  },
  { timestamps: true }
);

export const AppliedForms = model("AppliedForms", ApplicantsSchema);
