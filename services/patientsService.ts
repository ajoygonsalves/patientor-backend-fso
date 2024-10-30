import patientsData from "../data/patients";
import { v1 as uuid } from "uuid";
import { PatientResult, PatientSchema } from "../types/types";
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

export default {
  getAllPatients,
  addPatient,
};
