import { Schema, model } from "mongoose";
import { IForms } from "../types";

//formschema
const Formschema = new Schema<IForms>(
  {
    formID: {
      type: String,
      required: true,
    },
    companyID: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//creating a model
export const Form = model<IForms>("Forms", Formschema);
