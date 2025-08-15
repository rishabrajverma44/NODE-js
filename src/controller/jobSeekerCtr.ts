import { Request, Response } from "express";
import { JobSeekerServices } from "../services/jobSeeker";
import { FormServices } from "../services/FormServices";

class formController {
  //get all forms
  getForms = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const forms = await JobSeekerServices.getAllForm(req.userEmail);
      res.send(forms);
    }
  };
  //apply form
  applyForm = async (req: Request, res: Response) => {
    const form = await FormServices.getForm(req.params.formID);
    if (form === "form not available")
      return res.status(404).send({ message: "Form not avilable !" });
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const formID: string = req.params.formID;
      const forms = await JobSeekerServices.applyForm(userMail, formID);
      res.send(forms);
    } else res.status(404).send({ message: "Email not found !" });
  };
  //get user details
  getUserDetails = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const userName = await JobSeekerServices.getUserDetails(userMail);
      res.send(userName);
    }
  };
  //get applied form details
  getAppliedFormNumbers = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const appliedForms = await JobSeekerServices.getAppliedFormNumbers(
        userMail
      );
      res.send(appliedForms);
    }
  };
  //get job details by formID
  getFormDetailsBYform = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const formID: string = req.params.formID;
      const formDetails = await JobSeekerServices.getFormDetails(formID);
      res.send(formDetails);
    }
  };
}

//export controller
export const JobSeekerCtr = new formController();
