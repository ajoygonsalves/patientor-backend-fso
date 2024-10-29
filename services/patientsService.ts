import patientsData from "../data/patients";
import { v1 as uuid } from "uuid";
import { Gender, Patients, PatientsNonSensitiveEntries } from "../types/types";

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const getAllPatients = () => {
  return patientsData.map(({ ssn, ...rest }) => rest);
};

const addPatient = async (
  patient: Omit<Patients, "id">
): Promise<PatientsNonSensitiveEntries | null | undefined> => {
  if (!patient) {
    return undefined;
  }

  if (!patient.ssn) {
    return undefined;
  }

  if (!patient.name) {
    return undefined;
  }

  if (!patient.dateOfBirth) {
    return undefined;
  }

  if (!patient.gender || !isGender(patient.gender)) {
    return undefined;
  }

  if (!patient.occupation) {
    return undefined;
  }

  try {
    const newPatient = {
      id: uuid(),
      ...patient,
    };

    patientsData.push(newPatient);
    return newPatient;
  } catch (error) {
    return undefined;
  }
};

export default {
  getAllPatients,
  addPatient,
};
