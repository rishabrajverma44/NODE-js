import { Request, Response } from "express";
import { SchemaValidation } from "../models/SchemaValidation";
import { FormServices } from "../services/FormServices";

class formController {
  addForm = async (req: Request, res: Response) => {
    //data to be saved in database
    const data = {
      company: req.body.company,
      role: req.body.role,
      jobType: req.body.jobType,
      location: req.body.location,
      date: req.body.date,
      status: req.body.status,
      notes: req.body.notes,
    };
    //validating the request
    const { error, value } = SchemaValidation.validate(data);

    if (error) {
      res.send(error.message);
    } else {
      //call the create post function in the service and pass the data from the request
      const post = await FormServices.createForm(value);
      res.status(201).send(post);
    }
  };

  //get all forms
  getForms = async (req: Request, res: Response) => {
    const posts = await FormServices.getForms();
    res.send(posts);
  };

  //get a single form
  getAForm = async (req: Request, res: Response) => {
    //get id from the parameter
    const id = req.params.id;
    const post = await FormServices.getForm(id);
    res.send(post);
  };

  //update form
  updateForm = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await FormServices.updateForm(id, req.body);
    res.send(post);
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
