import express, { Response } from "express";
import diagnoseService from "../services/diagnoseService";
import { Diagnosis } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  console.log("Fetching all diagnoses");
  res.send(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});

export default router;
