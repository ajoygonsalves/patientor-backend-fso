import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientsNonSensitiveEntries = Omit<Patients, "ssn" | "entries">;

export const PatientSchema = z.object({
  id: z.string().uuid("Invalid id"),
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  occupation: z.string().min(1, "Occupation is required"),
  entries: z.array(z.any()),
});

export type PatientResult = {
  success: boolean;
  data?: PatientsNonSensitiveEntries;
  errors?: z.ZodIssue[] | string[];
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}
