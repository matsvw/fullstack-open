const calculateBmi = (height: number, weight: number): string => {
  const sq: number = (height / 100.0) ** 2;
  const bmi: number = weight / sq;

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

console.log(calculateBmi(180, 74));
//console.log(calculateBmi(185, 82));
