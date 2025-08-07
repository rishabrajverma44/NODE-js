import { Request, Response } from "express";
import { JobSeekerServices } from "../services/jobSeeker";

class formController {
  //get all forms
  getForms = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const forms = await JobSeekerServices.getFormsByUser(userMail);
      res.send(forms);
    } else res.status(404).send({ message: "Email not found !" });
  };
  //apply form
  applyForm = async (req: Request, res: Response) => {
    if (req.userEmail) {
      const userMail: string = req.userEmail;
      const formID: string = req.params.formID;

      const forms = await JobSeekerServices.applyForm(userMail, formID);
      res.send(forms);
    } else res.status(404).send({ message: "Email not found !" });
  };
}

//export controller
export const JobSeekerCtr = new formController();
