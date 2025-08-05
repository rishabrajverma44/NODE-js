import { Router } from "express";
import { userCtr } from "../controller/userCtr";

export const userRouter = Router();
userRouter.post("/register", userCtr.userRegistration);
userRouter.post("/login", userCtr.userLogin);
userRouter.post("/reset", userCtr.userChangePassword);
