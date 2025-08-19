import { Router } from "express";
import { JobSeekerCtr } from "../controller/jobSeekerCtr";

export const jobSeekerRoute = Router();
jobSeekerRoute.get("/", JobSeekerCtr.getAllForms);
jobSeekerRoute.get("/forms/:formID", JobSeekerCtr.getFormDetailsBYform);
jobSeekerRoute.post("/apply/:formID", JobSeekerCtr.applyForm);
jobSeekerRoute.post("/applied/:formID", JobSeekerCtr.isAppliedForm);
jobSeekerRoute.get("/useDetails", JobSeekerCtr.getUserDetails);
jobSeekerRoute.get("/numbersOfFormApplied", JobSeekerCtr.getAppliedFormNumbers);
jobSeekerRoute.get("/appliedForms", JobSeekerCtr.getAppliedForms);
jobSeekerRoute.get("/getChart", JobSeekerCtr.getAppliedFormsChartData);
