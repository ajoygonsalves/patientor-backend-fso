import express from "express";
const app = express();

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
const PORT = 3111;
app.listen(PORT, () => {
  console.log(`Server up comrade. PORT: ${PORT}`);
});
