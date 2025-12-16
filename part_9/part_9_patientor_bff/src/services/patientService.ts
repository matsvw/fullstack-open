import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import {
  NonSensitivePatient,
  Patient,
  NewPatientEntry,
  NewEntryEntry,
  Entry,
} from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry: Patient = { id: uuidv4(), ...patient };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntryEntry): Entry => {
  const newEntryEntry: Entry = { id: uuidv4(), ...entry };
  const patient = patients.find((p) => p.id === patientId);
  patient?.entries.push(newEntryEntry);
  return newEntryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntry,
};
