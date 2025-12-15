import express, { Response, Request, NextFunction } from "express";
import patientService from "../services/patientService";
import {
  PatientEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  NewPatientSchema,
} from "../types";

import { errorMiddleware } from "../utils";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

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

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    console.log("Saving a patient!");
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware); // this needs to come last

export default router;
