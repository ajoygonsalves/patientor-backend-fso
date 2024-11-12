import patientsData from "../data/patients";
import { v1 as uuid } from "uuid";
import {
  Entry,
  PatientResult,
  PatientSchema,
  EntrySchema,
} from "../types/types";
import { z } from "zod";

const getAllPatients = () => {
  return patientsData.map(({ ssn, ...rest }) => rest);
};

const addPatient = async (
  patient: z.infer<typeof PatientSchema>
): Promise<PatientResult> => {
  try {
    const validateData = PatientSchema.omit({ id: true }).parse(patient);

    const newPatient = {
      ...validateData,
      id: uuid(),
    };

    const validatePatient = PatientSchema.parse(newPatient);

    patientsData.push(validatePatient);
    return { success: true, data: validatePatient };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues };
    }
    return { success: false, errors: ["Unknown error"] };
  }
};

const getPatientById = (id: string): PatientResult => {
  const patient = patientsData.find((patient) => patient.id === id);
  if (!patient) {
    return { success: false, errors: ["Patient not found"] };
  }
  return { success: true, data: patient };
};

const addEntry = async (id: string, entry: unknown): Promise<PatientResult> => {
  const patientResult = await getPatientById(id);
  if (!patientResult.success || !patientResult.data) {
    return { success: false, errors: ["Patient not found"] };
  }

  try {
    if (typeof entry !== "object" || entry === null) {
      return { success: false, errors: ["Invalid entry data"] };
    }
    const validatedEntry = EntrySchema.parse({ ...entry, id: uuid() });

    const patientIndex = patientsData.findIndex((p) => p.id === id);
    if (patientIndex >= 0) {
      patientsData[patientIndex].entries.push(validatedEntry as Entry);
      return { success: true, data: patientsData[patientIndex] };
    }

    return { success: false, errors: ["Failed to add entry"] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues };
    }
    return { success: false, errors: ["Invalid entry data"] };
  }
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
  addEntry,
};
