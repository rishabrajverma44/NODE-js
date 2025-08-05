import { Request, Response } from "express";
import { JobSeekerServices } from "../services/jobSeeker";

class formController {
  //get all forms
  getForms = async (req: Request, res: Response) => {
    const forms = await JobSeekerServices.getForms();
    res.send(forms);
  };
  //apply form
  applyForm = async (req: Request, res: Response) => {
    const formId = req.body.formID;
    const userID = req.body.userID;
    const forms = await JobSeekerServices.applyForm(formId, userID);
    res.send(forms);
  };
}

//export controller
export const JobSeekerCtr = new formController();
