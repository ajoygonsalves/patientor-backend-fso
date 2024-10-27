import express, { Request, Response } from "express";
const router = express.Router();
import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types/types";

router.get("/", (_req: Request, res: Response<Diagnosis[]>) => {
  res.status(200).json({
    ...diagnosisService.getDiagnosis(),
  });
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
