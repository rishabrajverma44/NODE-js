import { Request, Response } from "express";
import { userServices } from "../services/Users";
import { generateToken } from "../services/authGeneral";
import {
  UserChangePassword,
  UserLoginValidation,
  UserRegistrationValidation,
} from "../Validation/UserRegistration";
import { UsersModel } from "../models/Users";
import { verifyEmplyeeRole } from "../services/authRole";

class userClass {
  userRegistration = async (req: Request, res: Response) => {
    const data = req.body;
    //validating the registarion request
    const { error, value } = UserRegistrationValidation.validate(data);
    if (error) return res.send(error.message);
    //check for unique email
    const email = await userServices.checkEmail(req.body.userEmail);
    if (!email) {
      await userServices.createUser(value);
      res.status(201).send("user created successfully !");
    } else {
      res.status(409).send("Email allready exists !");
    }
  };
  userLogin = async (req: Request, res: Response) => {
    const data = req.body;
    //validating the login request
    const { error, value } = UserLoginValidation.validate(data);
    if (error) res.send(error.message);
    const { userEmail, password } = req.body;

    const checkPassword = await userServices.checkSigninPassword(
      userEmail,
      password
    );
    if (checkPassword) {
      //add jwt token here
      const token = generateToken({ userEmail, password });
      const userRole = await verifyEmplyeeRole(userEmail);
      res.setHeader("Authorization", "bearer " + token);
      res.status(200).json({ message: "Login successfully", role: userRole });
    } else {
      return res.status(404).send("Wrong credentials !");
    }
  };
  userChangePassword = async (req: Request, res: Response) => {
    const data = req.body;
    const { value, error } = UserChangePassword.validate(data);
    const user = await UsersModel.findOne({ userEmail: req.body.userEmail });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("Email not found !");
    }
  };
}
export const UserCtr = new userClass();
