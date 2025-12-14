import express from "express";
import { getNumber } from "./utils/inputHelper";
import { BmiInput, calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/ping", (_req, res) => {
  //console.log(req);
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  //console.log(req);
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const wp: string = req.query.weight as string;
    const hp: string = req.query.height as string;

    if (!wp || !hp) {
      throw new Error("Please specify both height and weight");
    }

    const input: BmiInput = {
      weightInKilograms: getNumber(wp),
      heightInCentimeres: getNumber(hp),
    };

    const bmiResult: string = calculateBmi(input);

    res.json({
      weight: input.weightInKilograms,
      height: input.heightInCentimeres,
      bmi: bmiResult,
    });
  } catch (error) {
    let errMsg: string = "There was an error processing the request.";
    if (error instanceof Error) {
      errMsg += ": " + error.message;
    }
    res.status(400).json({ error: errMsg });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
