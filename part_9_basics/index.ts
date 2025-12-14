import express from "express";
const app = express();

app.get("/ping", (_req, res) => {
  //console.log(req);
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  //console.log(req);
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
