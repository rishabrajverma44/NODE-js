import { Userschema } from "../models/Users";
import { IUser, IUserLogin } from "../types";

class users {
  async createUser(data: IUser) {
    try {
      await Userschema.create(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const userServices = new users();
