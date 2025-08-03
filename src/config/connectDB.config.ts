import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//details from the env
const usernameDB = process.env.USERNAME_DB;
const passwordDB = process.env.PASSWORD_DB;

//connection string to mongo atlas
const connectionString = `mongodb+srv://${usernameDB}:${passwordDB}@clusterjobapp.1k4rkgr.mongodb.net/`;
const options = {
  autoIndex: false,
  socketTimeoutMS: 45000,
};

//db connection
console.log(`connecting to....  ${connectionString}`);
const connectDB = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(`Database connection succeffully`);
    }
  })
  .catch((err) => {
    console.log(err);
  });

export default connectDB;
