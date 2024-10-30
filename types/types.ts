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

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientsNonSensitiveEntries = Omit<Patients, "ssn">;

export const PatientSchema = z.object({
  id: z.string().uuid("Invalid id"),
  name: z.string().min(1, "Name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  ssn: z.string().min(1, "SSN is required"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  occupation: z.string().min(1, "Occupation is required"),
});

export type PatientResult = {
  success: boolean;
  data?: PatientsNonSensitiveEntries;
  errors?: z.ZodIssue[] | string[];
};
