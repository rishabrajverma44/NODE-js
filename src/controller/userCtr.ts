import { Request, Response } from "express";
import { userServices } from "../services/Users";
class user {
  userSignup = async (req: Request, res: Response) => {
    const { userName, password, email } = req.body;

    await userServices.createUser({
      userName,
      email,
      password,
    });
    res.status(200).send("user created !");
  };
}
export const userCtr = new user();
