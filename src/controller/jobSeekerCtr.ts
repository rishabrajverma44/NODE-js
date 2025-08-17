import { Request, Response } from "express";
import { JobSeekerServices } from "../services/jobSeeker";
import { FormServices } from "../services/FormServices";

class formController {
  //get all forms
  getAllForms = async (req: Request, res: Response) => {
    const request = {
      Email: String(req.userEmail || "").trim(),
      page: Number(req.query?.page) > 0 ? Number(req.query?.page) : 1,
      size: Number(req.query?.size) > 0 ? Number(req.query?.size) : 10,
      search: req.query?.search ? String(req.query?.search).trim() : "",
      filters: {},
    };

    if (req.userEmail) {
      const forms = await JobSeekerServices.getAllForm(request);
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
  //check is applied
  isAppliedForm = async (req: Request, res: Response) => {
    const form = await FormServices.getForm(req.params.formID);
    if (form === "form not available")
      return res.status(404).send({ message: "Form not avilable !" });
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const formID: string = req.params.formID;
      const result = await JobSeekerServices.isAppliedCkeck(userMail, formID);
      res.send(result);
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
  //get getNumbers Of Form Applied by user
  getAppliedFormNumbers = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const appliedForms = await JobSeekerServices.getNumbersOfFormApplied(
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
