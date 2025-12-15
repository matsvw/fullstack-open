import { getNumber } from "./utils/inputHelper";

export interface BmiInput {
  heightInCentimeres: number;
  weightInKilograms: number;
}

export const calculateBmi = (bmiInput: BmiInput): string => {
  const sq: number = (bmiInput.heightInCentimeres / 100.0) ** 2;
  const bmi: number = bmiInput.weightInKilograms / sq;

  console.log("Calculated BMI: ", bmi);
  switch (true) {
    case bmi < 16:
      return "Severe thinness";
      break;
    case bmi >= 16 && bmi < 17:
      return "Moderate thinness";
      break;
    case bmi >= 17 && bmi < 18.5:
      return "Underweight (Mild thinness)";
      break;
    case bmi >= 18.5 && bmi < 25:
      return "Normal range";
      break;
    case bmi >= 25 && bmi < 30:
      return "Overweight (Pre-obese)";
      break;
    case bmi >= 30 && bmi < 35:
      return "Obese (Class I)	";
      break;
    case bmi >= 35 && bmi < 40:
      return "Obese (Class II)";
      break;
    case bmi >= 40:
      return "Obese (Class III)";
      break;
    default:
      return "WTF?";
  }
};

const parseBmiArguments = (args: string[]): BmiInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  return {
    heightInCentimeres: getNumber(args[2]),
    weightInKilograms: getNumber(args[3]),
  };
};

try {
  if (require.main === module) {
    const values: BmiInput = parseBmiArguments(process.argv);
    console.log(calculateBmi(values));
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
