import express, { Response } from "express";
import diagnoseService from "../services/diagnoseService";
import { DiagnoseEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnoseEntry[]>) => {
  console.log("Fetching all diagnoses");
  res.send(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
