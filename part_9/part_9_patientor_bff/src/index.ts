import express, { RequestHandler } from "express";
import cors, { CorsOptions } from "cors";

import patientRouter from "./routes/patients";
import diagnoseRouter from "./routes/diagnoses";

const app = express();

const PORT = 3001;

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Create a typed middleware instance
const corsMiddleware: RequestHandler = cors(corsOptions);

// Use the middleware
app.use(corsMiddleware);

app.use(express.json());

app.use("/api/patients", patientRouter);
app.use("/api/diaries", diagnoseRouter);

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send(`pong at ${new Date().toLocaleString()}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
