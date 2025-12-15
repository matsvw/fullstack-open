import express, { RequestHandler } from "express";
import cors, { CorsOptions } from "cors";
import diaryRouter from "./routes/diaries";

const corsOptions: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();

// Create a typed middleware instance
const corsMiddleware: RequestHandler = cors(corsOptions);

// Use the middleware
app.use(corsMiddleware);

app.use(express.json());

const PORT = 3000;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
