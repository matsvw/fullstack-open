import { getNumber } from "./utils/inputHelper";

interface ExerciseInput {
  dailyExerciseInHours: number[];
  averageTarget: number;
}

interface ExerciseCalculationResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  parameters: ExerciseInput,
): ExerciseCalculationResult => {
  const totalHours = parameters.dailyExerciseInHours.reduce(
    (accumulator, current) => {
      return accumulator + current;
    },
    0,
  );

  const averageHours = totalHours / parameters.dailyExerciseInHours.length;
  const diff = averageHours / parameters.averageTarget;

  let rating: number = 2;
  let ratingDesc: string = "Close enough";

  if (diff > 1.5) {
    rating = 3;
    ratingDesc = "You are on fire!";
  } else if (diff < 0.5) {
    rating = 1;
    ratingDesc = "Tough week?";
  }

  const ret: ExerciseCalculationResult = {
    periodLength: parameters.dailyExerciseInHours.length,
    trainingDays: parameters.dailyExerciseInHours.filter((h) => h > 0).length,
    success: averageHours >= parameters.averageTarget,
    rating: rating,
    ratingDescription: ratingDesc,
    target: parameters.averageTarget,
    average: averageHours,
  };

  return ret;
};

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const dailyHours: number[] = [];

  const target = getNumber(args[2]);

  for (let a = 3; a < args.length; a++) {
    dailyHours.push(getNumber(args[a]));
  }

  return {
    dailyExerciseInHours: dailyHours,
    averageTarget: target,
  };
};

try {
  const values: ExerciseInput = parseExerciseArguments(process.argv);
  console.log(calculateExercises(values));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;
