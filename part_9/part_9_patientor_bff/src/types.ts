import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]> | undefined;
}

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "Invalid entry date format"),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.HealthCheck),
  healthCheckRating: z.enum(HealthCheckRating),
});

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave | undefined;
}

export const SickLeaveSchema = z
  .object({
    startDate: z
      .string()
      .refine(
        (s) => !Number.isNaN(Date.parse(s)),
        "Invalid sick leave startDate",
      ),
    endDate: z
      .string()
      .refine(
        (s) => !Number.isNaN(Date.parse(s)),
        "Invalid sick leave endDate",
      ),
  })
  .refine((val) => new Date(val.endDate) >= new Date(val.startDate), {
    message: "endDate must be on or after startDate",
    path: ["endDate"],
  });

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.OccupationalHealthcare),
  employerName: z.string().min(1),
  sickLeave: SickLeaveSchema.optional(),
});

export interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge?: Discharge | undefined;
}

export const DischargeSchema = z.object({
  date: z
    .string()
    .refine(
      (s) => !Number.isNaN(Date.parse(s)),
      "Invalid discharge date format",
    ),
  criteria: z.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal(EntryType.Hospital),
  discharge: DischargeSchema.optional(),
});

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

//Zod schemas for entry without id
const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({ id: true });
const NewOccupationalHealthcareEntrySchema =
  OccupationalHealthcareEntrySchema.omit({ id: true });
const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);

export type NewEntryEntry = z.infer<typeof NewEntrySchema>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "Invalid dob format"),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).default([]),
});

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
//export type NonSensitivePatientEntry = Pick<PatientEntry, 'id' | 'name' |'occupation'>;
