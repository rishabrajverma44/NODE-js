import { Router } from "express";
import { JobSeekerCtr } from "../controller/jobSeekerCtr";

export const jobSeekerRoute = Router();
jobSeekerRoute.get("/", JobSeekerCtr.getAllForms);
jobSeekerRoute.get("/forms/:formID", JobSeekerCtr.getFormDetailsBYform);
jobSeekerRoute.post("/apply/:formID", JobSeekerCtr.applyForm);
jobSeekerRoute.post("/applied/:formID", JobSeekerCtr.isAppliedForm);
jobSeekerRoute.get("/useDetails", JobSeekerCtr.getUserDetails);
jobSeekerRoute.get("/appliedForms", JobSeekerCtr.getAppliedFormNumbers);
