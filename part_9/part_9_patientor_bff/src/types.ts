import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
//export type NonSensitivePatientEntry = Pick<PatientEntry, 'id' | 'name' |'occupation'>;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export const EntrySchema = z.object({});

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).default([]),
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
