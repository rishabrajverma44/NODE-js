//creating an interface
export interface IForms {
  formID: string;
  userID: String;
  company: string;
  role: string;
  jobType: string;
  location: string;
  date: string;
  status: string;
  notes: string;
  applicants: Array<String>;
}
//user registration
export interface IUser {
  userID: string;
  userName: string;
  userEmail: string;
  password: string;
  role: string;
  companyDetails: {
    companyName: string;
    description: string;
  };
}
//user login
export interface IUserLogin {
  userEmail: string;
  password: string;
}
