import express from "express";
import { FormCtr } from "../controller/FormCtr";

//initiating the router
export const router = express.Router();
router.post("/", FormCtr.addForm);
router.get("/", FormCtr.getForms);
router.get("/:id", FormCtr.getAForm);
router.put("/:id", FormCtr.updateForm);
router.delete("/:id", FormCtr.deleteForm);

//user login
