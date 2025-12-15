import { v4 as uuidv4 } from "uuid";
import patientData from "../../data/patients";
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from "../types";

const getEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientData.find((d) => d.id === id);
  return entry;
};

const addPatient = (patient: NewPatientEntry): PatientEntry => {
  const newPatientEntry: PatientEntry = { id: uuidv4(), ...patient };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};
