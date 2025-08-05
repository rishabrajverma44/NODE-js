import { model, Schema } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>(
  {
    userID: {
      type: String,
      require: true,
      unique: true,
    },
    userName: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Userschema = model<IUser>("Users", userSchema);
