export type Gender = "male" | "female" | "other";

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
//export type NonSensitivePatientEntry = Pick<PatientEntry, 'id' | 'name' |'occupation'>;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}
