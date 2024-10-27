import patientsData from "../data/patients";

const getAllPatients = () => {
  return patientsData.map(({ ssn, ...rest }) => rest);
};

export default {
  getAllPatients,
};
