import express, { Request, Response } from "express";
import cors from "cors";
import diagnosisRouter from "../routes/diagnosisRouter";
import patientsRouter from "../routes/patientsRouter";

const app = express();
app.use(cors());

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

const PORT = 3111;
app.listen(PORT, () => {
  console.log(`Server up comrade. PORT: ${PORT}`);
});
