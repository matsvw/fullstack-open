export const getNumber = (
  input: string,
  useDefault: boolean = false,
  defaultNumber: number = 0,
): number => {
  if (!isNaN(Number(input))) {
    return Number(input);
  } else {
    if (useDefault) {
      return defaultNumber;
    }
    throw new Error("Provided values were not numbers!");
  }
};
