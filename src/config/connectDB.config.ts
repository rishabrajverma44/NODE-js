import mongoose from "mongoose";

//details from the env
const usernameDB = "Rishab_123";
const passwordDB = "Rishab_123";
const dbName = "jobAplication";

//connection string to mongo atlas

const connectionString = `mongodb+srv://${usernameDB}:${passwordDB}@mern.wilxs9b.mongodb.net/`;
console.log(connectionString);
const options = {
  autoIndex: false,
  socketTimeoutMS: 45000,
};

//db connection
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
