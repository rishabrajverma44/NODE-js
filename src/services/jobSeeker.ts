import { Form } from "../models/Form";

class jobSeekerService {
  //get all forms
  async getForms() {
    try {
      const allForms = await Form.find({}, { applicants: 0, _id: 0 });
      return allForms;
    } catch (error) {
      console.log(error);
    }
  }
  async applyForm(id: string, userID: string) {
    try {
      
    } catch (error) {
      console.log(error);
    }
  }
}

export const JobSeekerServices = new jobSeekerService();
