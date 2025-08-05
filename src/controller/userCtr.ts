import { Request, Response } from "express";
import { userServices } from "../services/Users";
import { setUserToken } from "../services/authGeneral";
import {
  UserChangePassword,
  UserLoginValidation,
  UserRegistrationValidation,
} from "../Validation/UserRegistration";
import { Userschema } from "../models/Users";

class user {
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
      const token = setUserToken({ userEmail, password });
      res.cookie("jobApp_jwt", token);
      res.status(200).send("save token in cookies !");
    } else {
      return res.status(404).send("Wrong credentials !");
    }
  };
  userChangePassword = async (req: Request, res: Response) => {
    const data = req.body;
    const { value, error } = UserChangePassword.validate(data);
    const user = await Userschema.findOne({ userEmail: req.body.userEmail });
    if (user) {
      console.log(user);
      res.status(200).send(user);
    } else {
      res.status(404).send("Email not found !");
    }
  };
}
export const userCtr = new user();
