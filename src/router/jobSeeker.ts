import { Router } from "express";
import { JobSeekerCtr } from "../controller/jobSeekerCtr";

export const jobSeekerRoute = Router();
jobSeekerRoute.get("/", JobSeekerCtr.getForms);
jobSeekerRoute.post("/apply/:formID", JobSeekerCtr.applyForm);
jobSeekerRoute.get("/useDetails", JobSeekerCtr.getUserDetails);
jobSeekerRoute.get("/appliedForms", JobSeekerCtr.getAppliedFormNumbers);
jobSeekerRoute.get("/forms/:formID", JobSeekerCtr.getFormDetailsBYform);
