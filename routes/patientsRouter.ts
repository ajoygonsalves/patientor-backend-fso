import express, { Request, Response } from "express";
const router = express.Router();
import { PatientsNonSensitiveEntries } from "../types/types";
import patientsService from "../services/patientsService";

router.get(
  "/",
  (_req: Request, res: Response<PatientsNonSensitiveEntries[]>) => {
    res.status(200).json(patientsService.getAllPatients());
  }
);

router.post("/", async (req, res) => {
  const newPatient = await patientsService.addPatient(req.body);
  if (!newPatient) {
    res.status(400).json({ error: "Invalid patient data" });
  }
  console.log("New patient added:", newPatient);
  res.status(201).json(newPatient);
});

export default router;
