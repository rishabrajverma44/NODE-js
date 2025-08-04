import { Request, Response, NextFunction } from "express";
import { getUser } from "../controller/auth";

export async function restrictToLoggedinUserOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userJwt = req?.cookies?.jobApp_jwt;
  if (!userJwt) {
    res.status(404).send("cookies not found !");
    return;
  }
  const user = getUser(userJwt);
  if (!user) {
    res.status(404).send("login user first !");
    return;
  }
  next();
}
