import { Form } from "../models/Form";
import { UsersModel } from "../models/Users";
import { IForms } from "../types";
import { generateCustomId } from "../utils/randomId";
import path from "path";
import fs from "fs";

class formService {
  //create a form
  async createForm(data: IForms, userMail: string) {
    try {
      const companyID = await UsersModel.findOne(
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
      const companyID = await UsersModel.findOne(
        { userEmail: userMail },
        { userID: 1, userName: 1 }
      );
      const allForms = await Form.find(
        { companyID: companyID?.userID },
        { _id: 0, companyID: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      ).sort({ updatedAt: -1 });
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

  //get header details for emplyeer
  async getUserDetails(userMail: string) {
    try {
      const companyDetails = await UsersModel.findOne(
        { userEmail: userMail },
        { userName: 1 }
      );
      return companyDetails?.userName;
    } catch (error) {
      console.log(error);
    }
  }
  //post dunmmy form data
  async postDummyForms() {
    console.log("inserting....");
    try {
      // Load JSON file
      const dataPath = path.join(__dirname, "../utils/forms.json");
      const rawData = fs.readFileSync(dataPath, "utf-8");
      const forms = JSON.parse(rawData);

      // Add formID, company id to each
      const formsWithId = forms.map((form: any) => ({
        formID: generateCustomId(),
        companyID: "mebgbc3vqfe4zfw18j",
        ...form,
      }));

      // Insert many
      const result = await Form.insertMany(formsWithId);
      console.log("inserted !");
      return {
        success: true,
        insertedCount: result.length,
        data: result,
      };
    } catch (error) {
      console.log("error in dummy data pushing to db...", error);
    }
  }
}

export const FormServices = new formService();
