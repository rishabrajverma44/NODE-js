import { model, Schema } from "mongoose";

interface userSchema {
  userName: String;
  userEmail: String;
  password: String;
}

const userSchema = new Schema<userSchema>(
  {
    userName: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Userschema = model<userSchema>("Users", userSchema);
