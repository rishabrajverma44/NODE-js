import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyEmplyeeRole } from "../services/authRole";

const secret = process.env.JWT_SECRETE;

function authRoleBased(...allowedRoles: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.cookies?.jobApp_jwt;
    try {
      if (secret) {
        const userDetails = jwt.verify(token, secret);
        const userEmail = await JSON.parse(JSON.stringify(userDetails))
          .userEmail;
        const userRole = await verifyEmplyeeRole(userEmail);
        if (!allowedRoles.includes(userRole))
          return res.status(404).send("User not authorized !");
        else next();
      }
    } catch (error) {
      next(error);
      return res.status(404).send(`somthing went wrong !, ${error}`);
    }
  };
}
export default authRoleBased;
