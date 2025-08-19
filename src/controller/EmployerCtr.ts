import { Request, Response } from "express";
import { FormValidation } from "../Validation/FormValidation";
import { Employerservices } from "../services/EmployerServices";

class employerController {
  //Add form
  addForm = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const { error, value } = FormValidation.validate(req.body);
      if (error) {
        console.log(error);
        res.send(error.message);
      } else if (value) {
        const form = await Employerservices.createForm(value, userMail);
        res.status(201).send(form);
      }
    }
  };

  //get all forms
  getForms = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const forms = await Employerservices.getCompanyBasedForms(userMail);
      res.send(forms);
    }
  };

  //get chart data
  getChart = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const getChart = await Employerservices.getChartData(userMail);
      res.send(getChart);
    }
  };

  //get a single form
  getAForm = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id;
    const form = await Employerservices.getForm(id);
    res.send(form);
  };

  //update form
  updateForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { error, value } = FormValidation.validate(req.body);
    if (error) {
      res.send(error.message);
    } else if (value) {
      const form = await Employerservices.updateForm(id, value);
      res.send(req.body);
    }
  };

  //delete a form
  deleteForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Employerservices.deleteForm(id);
    res.send("form deleted");
  };
  //get company details
  getUserDetails = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const userName = await Employerservices.getUserDetails(userMail);
      res.send(userName);
    }
  };

  //get applied forms
  getAppliedForms = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const response = await Employerservices.formApplied(userMail);
      res.send(response);
    }
  };

  //dummy form data insert many
  postDummydata = async (req: Request, res: Response) => {
    const response = await Employerservices.postDummyForms();
    res.send({
      success: response?.success,
      elementInserted: response?.insertedCount,
    });
  };
}

//export controller
export const employerContr = new employerController();
