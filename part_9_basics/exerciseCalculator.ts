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
  dailyHours: number[],
  target: number = 1.0,
): ExerciseCalculationResult => {
  const totalHours = dailyHours.reduce((accumulator, current) => {
    return accumulator + current;
  }, 0);

  const averageHours = totalHours / dailyHours.length;
  const diff = averageHours / target;

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
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((h) => h > 0).length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDesc,
    target: target,
    average: averageHours,
  };

  return ret;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
