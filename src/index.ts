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
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded bodies
// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/user", userRouter);
app.use("/company", authRoleBased("company"), formRoute);
app.use("/job_seeker", authRoleBased("job_seeker"), jobSeekerRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App is running on ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
  }
};

startServer();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
