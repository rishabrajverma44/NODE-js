import { Request, Response } from "express";
import { FormValidation } from "../Validation/FormValidation";
import { FormServices } from "../services/FormServices";

class formController {
  addForm = async (req: Request, res: Response) => {
    //validating the request
    const token = req?.cookies?.jobApp_jwt;
    if (!token) res.status(404).send("Token not found in cookies");
    const userId = await FormServices.getUserId(token);
    const formData = { ...req.body, companyID: userId };
    const { error, value } = FormValidation.validate(formData);
    if (error) {
      res.send(error.message);
    } else {
      //call the create form function in the service and pass the data from the request
      const form = await FormServices.createForm(value);
      res.status(201).send(form);
    }
  };

  //get all forms
  getForms = async (req: Request, res: Response) => {
    const forms = await FormServices.getForms();
    res.send(forms);
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
    const form = await FormServices.updateForm(id, req.body);
    res.send(form);
  };

  //delete a form
  deleteForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    await FormServices.deleteForm(id);
    res.send("form deleted");
  };
}

//export controller
export const FormCtr = new formController();
