import { NewPatientEntry, Gender } from "./types";

const isObject = (value: unknown): value is object => {
  return !!value && typeof value == "object";
};

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const parseString = (value: unknown): string => {
  if (!isString(value)) {
    throw new Error(`Value '${value}' is not a string`);
  }
  return value;
};

/*
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (value: unknown): string => {
  if (!value || !isString(value) || !isDate(value)) {
    throw new Error(`Incorrect or missing date: ${value}`);
  }
  return value;
};
*/

const isGender = (str: string): str is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(str);
};

const parseGender = (
  value: unknown,
  defaultGender: Gender = Gender.Other,
): Gender => {
  if (!value) {
    return defaultGender;
  }
  if (!isString(value) || !isGender(value)) {
    throw new Error(`Incorrect gender: ${value}`);
  }
  return value;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!isObject(object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};
