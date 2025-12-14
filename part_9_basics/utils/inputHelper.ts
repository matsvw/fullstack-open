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
    throw new Error("malformatted parameters");
  }
};

export function isNumberArray(val: unknown): val is number[] {
  return Array.isArray(val) && val.every((el) => typeof el === "number");
}
