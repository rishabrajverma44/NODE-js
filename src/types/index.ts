//creating an interface
export interface IForms {
  formID: string;
  company: string;
  role: string;
  jobType: string;
  location: string;
  date: string;
  status: string;
  notes: string;
}
//user registration
export interface IUser {
  userName: string;
  email: string;
  password: string;
}
//user login
export interface IUserLogin {
  userEmail: string;
  password: string;
}
