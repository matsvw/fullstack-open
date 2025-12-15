/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Response } from "express";
import { toNewPatientEntry } from "../utils";
import patientService from "../services/patientService";
import { NewPatientEntry, NonSensitivePatientEntry } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  console.log("Fetching non-sensitive patient data");
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  console.log("Saving a patient!");
  const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);
  const addedEntry: NewPatientEntry =
    patientService.addPatient(newPatientEntry);
  res.json(addedEntry);
});

export default router;
