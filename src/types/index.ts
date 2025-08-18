//creating an interface
export interface IForms {
  formID: string;
  companyID: String;
  company: String;
  role: string;
  jobType: string;
  location?: string;
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
}
//user login
export interface IUserLogin {
  userEmail: string;
  password: string;
}
//Applied forms
export interface IApplied {
  formID: string;
  userID: String;
  userEmail: String;
  companyID: String;
  formStatus: String;
}
//pagination types
export interface PaginationRequest {
  Email: string;
  page: number;
  size: number;
  search: string;
  filters: { [key: string]: string };
  sortBy?: string;
  sortOrder?: string;
}
