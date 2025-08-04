import { Request, Response } from "express";
import { userServices } from "../services/Users";
import { v4 as uuidv4 } from "uuid";
import { getUser, setUser } from "./auth";

import {
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
      password: password,
    });
    if (user === null) {
      return res.status(404).send("User not found !");
    } else {
      //handel session here
      const sessonID = uuidv4();
      setUser(sessonID, user);
      res.cookie("job_app", sessonID);
      res.status(200).send("login with cookies !");
    }
  };
}
export const userCtr = new user();
