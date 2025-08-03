import { Form } from "../models/Form";

export class formService {
  //create a form
  async createForm(data: any) {
    try {
      const dataWithId = { ...data, formID: Math.random() };
      await Form.create(dataWithId);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  //get all forms
  async getForms() {
    try {
      const allForms = await Form.find({});
      return allForms;
    } catch (error) {
      console.log(error);
    }
  }

  //get a single form
  async getForm(id: string) {
    try {
      const form = await Form.findOne({ formID: id });
      if (!form) {
        return "form not available";
      }
      return form;
    } catch (error) {
      console.log(error);
    }
  }

  //update a form
  async updateForm(id: string, data: any) {
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
      const form = await Form.findByIdAndDelete(id);
      if (!form) {
        return "form not available";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const FormServices = new formService();
