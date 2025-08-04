import { Request, Response } from "express";
import { userServices } from "../services/Users";
import { setUser } from "./auth";
import bcrypt from "bcrypt";

import {
  UserChangePassword,
  UserLoginValidation,
  UserRegistrationValidation,
} from "../Validation/UserRegistration";
import { Userschema } from "../models/Users";
class user {
  userSignup = async (req: Request, res: Response) => {
    const data = req.body;
    //validating the registarion request
    const { error, value } = UserRegistrationValidation.validate(data);
    if (error) return res.send(error.message);
    //check for unique email
    const email = await Userschema.findOne({ userEmail: req.body.userEmail });
    if (email === null) {
      const user = await userServices.createUser(value);
      res.status(201).send("user created successfully !");
    } else if (email) {
      res.status(409).send("Email allready exists !");
    }
  };
  userSignin = async (req: Request, res: Response) => {
    const data = req.body;
    //validating the login request
    const { error, value } = UserLoginValidation.validate(data);
    if (error) res.send(error.message);
    const { userEmail, password } = req.body;

    const user = await Userschema.findOne({
      userEmail: userEmail,
    });
    if (user !== null) {
      //check hased password
      const match = await bcrypt.compare(password, user.password.toString());
      if (!match) return res.status(404).send("Password not matched !");
      //handel jwt token here
      const token = setUser({ userEmail, password });
      res.cookie("jobApp_jwt", token);
      res.status(200).send("save token in cookies !");
    } else if (user === null) {
      return res.status(404).send("User not found !");
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
