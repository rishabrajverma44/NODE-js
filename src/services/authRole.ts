import { Userschema } from "../models/Users";

export async function verifyEmplyeeRole(email: string) {
  try {
    const user = await Userschema.findOne(
      { userEmail: email },
      { role: 1, _id: 0 }
    );
    if (user) return user.role;
  } catch (error) {
    console.log(`Not found any data based on email ${error}`);
  }
}
