import express from "express";
import dotenv from "dotenv";
import "./config/connectDB.config";

const app = express();
dotenv.config();

const PORT = process.env.PORT;


app.get("/", (req, res) => {
  res.send("hello form server");
});
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
