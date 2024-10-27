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

export default router;
