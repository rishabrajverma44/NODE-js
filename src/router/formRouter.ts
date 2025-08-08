import { Router } from "express";
import { FormCtr } from "../controller/FormCtr";

//initiating the router
export const formRoute = Router();
formRoute.post("/", FormCtr.addForm);
formRoute.get("/", FormCtr.getForms);
formRoute.get("/:id", FormCtr.getAForm);
formRoute.put("/:id", FormCtr.updateForm);
formRoute.delete("/:id", FormCtr.deleteForm);
formRoute.get("/user/userDetails", FormCtr.getUserDetails);
