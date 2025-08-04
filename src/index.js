import express from "express";
import dotenv from "dotenv";
import "./config/connectDB.config";
import { formRoute } from "./router/formRouter";
import { userRouter } from "./router/userRouter";

const app = express();
dotenv.config();

const port = process.env.PORT;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/form", formRoute);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello form server");
});
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
