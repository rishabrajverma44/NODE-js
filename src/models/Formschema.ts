import { Schema, model } from "mongoose";

//creating an interface
interface IPosts {
  formID: string;
  company: string;
  role: string;
  jobType: string;
  location: string;
  date: string;
  status: string;
  notes: string;
}

//Postschema
const Formschema = new Schema<IPosts>({
  formID: {
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
});

//creating a model
export const PostModel = model<IPosts>("Forms", Formschema);
