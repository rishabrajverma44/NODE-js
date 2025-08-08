import { Request, Response } from "express";
import { FormValidation } from "../Validation/FormValidation";
import { FormServices } from "../services/FormServices";

class formController {
  //Add form
  addForm = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const { error, value } = FormValidation.validate(req.body);
      if (error) {
        res.send(error.message);
      } else if (value) {
        const form = await FormServices.createForm(value, userMail);
        res.status(201).send(form);
      }
    }
  };

  //get all forms
  getForms = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const forms = await FormServices.getCompanyBasedForms(userMail);
      res.send(forms);
    }
  };

  //get a single form
  getAForm = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id;
    const form = await FormServices.getForm(id);
    res.send(form);
  };

  //update form
  updateForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { error, value } = FormValidation.validate(req.body);
    if (error) {
      res.send(error.message);
    } else if (value) {
      const form = await FormServices.updateForm(id, value);
      res.send(req.body);
    }
  };

  //delete a form
  deleteForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    await FormServices.deleteForm(id);
    res.send("form deleted");
  };
  //get company details
  getUserDetails = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const userName = await FormServices.getUserDetails(userMail);
      res.send(userName);
    }
  };
}

//export controller
export const FormCtr = new formController();
