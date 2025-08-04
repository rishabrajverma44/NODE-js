import { Userschema } from "../models/Users";
import { IUser, IUserLogin } from "../types";
import bcrypt from "bcrypt";

class users {
  async createUser(data: IUser) {
    try {
      const { password: password, ...userData } = data;
      const newPass = await bcrypt.hash(password, 10);
      const newData = { password: newPass, ...userData };
      await Userschema.create(newData);
    } catch (error) {
      console.log(error);
    }
  }
}

export const userServices = new users();
