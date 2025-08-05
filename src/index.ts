import express from "express";
import dotenv from "dotenv";
import "./config/connectDB.config";
import { formRoute } from "./router/formRouter";
import { userRouter } from "./router/userRouter";
import { restrictToLoggedinUserOnly } from "./middlewares/auth";
import cookieParser from "cookie-parser";
import authRoleBased from "./middlewares/authRoleBased";

const app = express();
dotenv.config();

const port = process.env.PORT;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use(
  "/form",
  restrictToLoggedinUserOnly,
  authRoleBased("employer"),
  formRoute
);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello form server");
});
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
