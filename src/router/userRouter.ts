import { Router } from "express";
import { userCtr } from "../controller/userCtr";

export const userRouter = Router();
userRouter.post("/", userCtr.userSignup);
userRouter.post("/login", userCtr.userSignin);
