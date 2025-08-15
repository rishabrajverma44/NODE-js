import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyEmplyeeRole } from "../services/authRole";
import { verifyTokenAndGetUser } from "../services/authGeneral";

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
    }
  }
}

function authRoleBased(...allowedRoles: any) {
  const secret = process.env.JWT_SECRETE;

  return async (req: Request, res: Response, next: NextFunction) => {
    var userToken = req?.headers["authorization"]?.toString();
    const token = userToken && userToken.split(" ")[1];
    if (!token) {
      res.status(404).send("token not found !");
      return;
    }
    const user = verifyTokenAndGetUser(token);
    if (!user) {
      res.status(405).send("Invalid token, please login!");
      return;
    }
    try {
      if (secret && token !== undefined) {
        const userDetails = jwt.verify(token, secret);
        const userEmail = await JSON.parse(JSON.stringify(userDetails))
          .userEmail;
        const userRole = await verifyEmplyeeRole(userEmail);
        if (!allowedRoles.includes(userRole))
          return res.status(404).send("User not authorized !");
        else {
          req.userEmail = userEmail;
          next();
        }
      }
    } catch (error) {
      next(error);
      return res.status(404).send(`somthing went wrong !, ${error}`);
    }
  };
}
export default authRoleBased;
