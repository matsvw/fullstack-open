import express from "express";
import { getNumber } from "./utils/inputHelper";
import { CalcOperation, CalculatorValues, calculator } from "./calculator";
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

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1)) || !value2 || isNaN(Number(value2))) {
    res
      .status(400)
      .json({ error: "Both value1 and value2 must be submitted and numbers" });
    return;
  }

  const calcValues: CalculatorValues = {
    value1: Number(value1),
    value2: Number(value2),
    operation: op as CalcOperation,
  };

  const result = calculator(calcValues);
  res.json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
