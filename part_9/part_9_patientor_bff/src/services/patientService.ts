import data from "../../data/patients";
import { NonSensitivePatientEntry, PatientEntry } from "../types";

const getEntries = (): PatientEntry[] => {
  return data;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};
