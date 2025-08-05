import { Form } from "../models/Form";
import { IForms } from "../types";
import { generateCustomId } from "../utils/randomId";

class formService {
  //create a form
  async createForm(data: IForms) {
    try {
      const dataWithId = { ...data, formID: generateCustomId() };
      await Form.create(dataWithId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //get all forms
  async getForms() {
    try {
      const allForms = await Form.find({}, { applicants: 0, _id: 0 });
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
      const forms = await Form.findByIdAndUpdate({ formID: id }, data, {
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
