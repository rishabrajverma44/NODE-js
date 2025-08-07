import { Form } from "../models/Form";
import { Userschema } from "../models/Users";
import { IForms } from "../types";
import { generateCustomId } from "../utils/randomId";

class formService {
  //create a form
  async createForm(data: IForms, userMail: string) {
    try {
      const companyID = await Userschema.findOne(
        { userEmail: userMail },
        { userID: 1 }
      );
      const dataWithId = {
        ...data,
        companyID: companyID?.userID,
        formID: generateCustomId(),
      };
      await Form.create(dataWithId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //get all forms based on company
  async getCompanyBasedForms(userMail: string) {
    try {
      const companyID = await Userschema.findOne(
        { userEmail: userMail },
        { userID: 1, userName: 1 }
      );
      const allForms = await Form.find(
        { companyID: companyID?.userID },
        { _id: 0, companyID: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      );
      return allForms;
    } catch (error) {
      console.log(error);
    }
  }

  //get a single form
  async getForm(id: string) {
    try {
      const form = await Form.findOne(
        { formID: id },
        { applicants: 0, _id: 0 }
      );
      if (!form) {
        return "form not available";
      }
      return form;
    } catch (error) {
      console.log(error);
    }
  }

  //update a form
  async updateForm(id: string, data: IForms) {
    try {
      const forms = await Form.findOneAndUpdate({ formID: id }, data, {
        new: true,
      });
      if (!forms) {
        return "forms not available";
      }
      return forms;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteForm(id: string) {
    try {
      const form = await Form.deleteOne({ formID: id });
      if (!form) {
        return "form not available";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const FormServices = new formService();
