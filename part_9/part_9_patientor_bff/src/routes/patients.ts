import express, { Response, Request, NextFunction } from "express";
import patientService from "../services/patientService";
import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  NewPatientSchema,
  NewEntrySchema,
  Entry,
  NewEntryEntry,
} from "../types";

import { errorMiddleware } from "../utils";

type EntryRouteParams = { id: string };

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
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
  (req: Request<unknown, Patient, NewPatientEntry>, res: Response<Patient>) => {
    console.log("Saving a patient");
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<EntryRouteParams, Entry, NewEntryEntry>,
    res: Response<Entry>,
  ) => {
    console.log("Saving an entry");
    const addedEntry = patientService.addEntry(req.params.id, req.body);
    res.json(addedEntry);
  },
);

router.use(errorMiddleware); // this needs to come last

export default router;
