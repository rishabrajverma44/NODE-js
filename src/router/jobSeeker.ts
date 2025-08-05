import { Router } from "express";
import { JobSeekerCtr } from "../controller/jobSeekerCtr";

export const jobSeekerRoute = Router();
jobSeekerRoute.get("/", JobSeekerCtr.getForms);
jobSeekerRoute.post("/apply/:id", JobSeekerCtr.applyForm);
