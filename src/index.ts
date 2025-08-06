import express from "express";
import dotenv from "dotenv";
import { formRoute } from "./router/formRouter";
import { userRouter } from "./router/userRouter";
import authRoleBased from "./middlewares/authRoleBased";
import { jobSeekerRoute } from "./router/jobSeeker";
import connectDB from "./config/connectDB.config";
import cors from "cors";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));

// Connect to database
connectDB();
// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/user", userRouter);
app.use("/company", authRoleBased("company"), formRoute);
app.use("/job_seeker", authRoleBased("job_seeker"), jobSeekerRoute);

app.get("/", (req, res) => {
  res.send("hello form server");
});
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
