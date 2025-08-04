import { Request, Response, NextFunction } from "express";
import { getUser } from "../controller/auth";

export async function restrictToLoggedinUserOnly(
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) {
  const userID = req?.cookies?.job_app;
  if (!userID) {
    res.status(404).send("cookies not found !");
    return;
  }
  const user = getUser(userID);
  if (!user) {
    res.status(404).send("login user first !");
    return;
  }

  req.user = user;
  next();
}
