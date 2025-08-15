import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//details from the env
const usernameDB = process.env.USERNAME_DB;
const passwordDB = process.env.PASSWORD_DB;

//connection string to mongo atlas    ?retryWrites=true&w=majority&appName=Cluster0
const newConnect =
  "mongodb+srv://mindfire_job:mindfire_job@cluster0.mreks5b.mongodb.net/";
const connectionString = `mongodb+srv://${usernameDB}:${passwordDB}@clusterjobapp.1k4rkgr.mongodb.net/`;
const options = {
  autoIndex: true,
  socketTimeoutMS: 45000,
};

//db connection
const connectDB = async () => {
  await mongoose
    .connect(connectionString, options)
    .then((res) => {
      if (res) {
        console.log(`Database connection successfully`);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return mongoose;
};
export default connectDB;
