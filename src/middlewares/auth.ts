import { Request, Response, NextFunction } from "express";
import { verifyTokenAndGetUser } from "../services/authGeneral";

export async function restrictToLoggedinUserOnly(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //const userJwt = req?.cookies?.jobApp_jwt;

  var userToken = req?.headers["authorization"]?.toString();
  const token = userToken && userToken.split(" ")[1];
  if (!token) {
    res.status(404).send("token not found !");
    return;
  }
  const user = verifyTokenAndGetUser(token);
  if (!user) {
    res.status(404).send("Invalid token, please login!");
    return;
  }
  next();
}
