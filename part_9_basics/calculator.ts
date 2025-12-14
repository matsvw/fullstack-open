import { getNumber } from "./utils/inputHelper";

export type CalcOperation = "multiply" | "add" | "divide";

export interface CalculatorValues {
  value1: number;
  value2: number;
  operation: CalcOperation;
}

export const calculator = (values: CalculatorValues): number => {
  switch (values.operation) {
    case "multiply":
      return values.value1 * values.value2;
    case "divide":
      if (values.value1 === 0) throw new Error("Can't divide by 0!");
      return values.value1 / values.value2;
    case "add":
      return values.value1 + values.value2;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

const parseCalculatorArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 5) throw new Error("Too many arguments");

  return {
    value1: getNumber(args[2]),
    value2: getNumber(args[3]),
    operation: (args.length === 4 || !args[4]
      ? "add"
      : args[4]) as CalcOperation,
  };
};

try {
  if (require.main === module) {
    const values: CalculatorValues = parseCalculatorArguments(process.argv);
    console.log(calculator(values));
  }
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
