import express from "express";
import dotenv from "dotenv";
import { formRoute } from "./router/formRouter";
import { userRouter } from "./router/userRouter";
import { restrictToLoggedinUserOnly } from "./middlewares/auth";
import authRoleBased from "./middlewares/authRoleBased";
import { jobSeekerRoute } from "./router/jobSeeker";
import connectDB from "./config/connectDB.config";
const cors = require("cors");

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = process.env.PORT;
connectDB();
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
