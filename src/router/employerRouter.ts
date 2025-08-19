import { Router } from "express";
import { employerContr } from "../controller/EmployerCtr";

//initiating the router
export const employerRoute = Router();
employerRoute.post("/", employerContr.addForm);
employerRoute.get("/", employerContr.getForms);
employerRoute.get("/:id", employerContr.getAForm);
employerRoute.put("/:id", employerContr.updateForm);
employerRoute.delete("/:id", employerContr.deleteForm);
employerRoute.get("/user/userDetails", employerContr.getUserDetails);
employerRoute.get("/user/appliedForms", employerContr.getAppliedForms);
employerRoute.get("/user/getchart", employerContr.getForms);

//dummy data insert
employerRoute.post("/dummy", employerContr.postDummydata);
