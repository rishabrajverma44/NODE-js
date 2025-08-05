import express from "express";
import dotenv from "dotenv";
import { formRoute } from "./router/formRouter";
import { userRouter } from "./router/userRouter";
import { restrictToLoggedinUserOnly } from "./middlewares/auth";
import cookieParser from "cookie-parser";
import authRoleBased from "./middlewares/authRoleBased";
import { jobSeekerRoute } from "./router/jobSeeker";
import connectDB from "./config/connectDB.config";

const app = express();
dotenv.config();

const port = process.env.PORT;
connectDB();
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use(
  "/company",
  restrictToLoggedinUserOnly,
  authRoleBased("company"),
  formRoute
);
app.use("/user", userRouter);
app.use(
  "/job_seeker",
  restrictToLoggedinUserOnly,
  authRoleBased("job_seeker"),
  jobSeekerRoute
);

app.get("/", (req, res) => {
  res.send("hello form server");
});
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
