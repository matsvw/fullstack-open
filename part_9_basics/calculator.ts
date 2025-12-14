type Operation = 'multiply' | 'add' | 'divide';
interface CalculatorValues {
  value1: number;
  value2: number;
  operation: Operation
}

const calculator = (values: CalculatorValues) : number => {
  switch(values.operation) {
    case 'multiply':
      return values.value1 * values.value2;
    case 'divide':
      if (values.value1 === 0) throw new Error('Can\'t divide by 0!');
      return values.value1 / values.value2;
    case 'add':
      return values.value1 + values.value2;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}


const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
      operation: (args.length===4 || !args[4] ? 'add': args[4]) as Operation
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


try {
  const values: CalculatorValues = parseArguments(process.argv)

  console.log(calculator(values));

} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

