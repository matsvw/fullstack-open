import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
//export type NonSensitivePatientEntry = Pick<PatientEntry, 'id' | 'name' |'occupation'>;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});
