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
      const posts = await Form.find({});
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  //get a single form
  async getForm(id: string) {
    try {
      const post = await Form.findOne({ formID: id });
      if (!post) {
        return "post not available";
      }
      return post;
    } catch (error) {
      console.log(error);
    }
  }

  //update a form
  async updateForm(id: string, data: any) {
    try {
      const postz = await Form.findByIdAndUpdate({ formID: id }, data, {
        new: true,
      });
      if (!postz) {
        return "post not available";
      }
      return postz;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteForm(id: string) {
    try {
      const post = await Form.findByIdAndDelete(id);
      if (!post) {
        return "post not available";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const FormServices = new formService();
