import { v4 as uuidv4 } from "uuid";
import patientData from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientData.find((p) => p.id === id);
  return entry;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = { id: uuidv4(), ...patient };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};
