import { isAxiosError } from "axios";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

function hasKey<K extends PropertyKey>(
  obj: unknown,
  key: K,
): obj is Record<K, unknown> {
  return obj !== null && typeof obj === "object" && key in obj;
}

export const getField = (obj: unknown, key: PropertyKey): unknown => {
  if (hasKey(obj, key)) {
    // `obj` is now `Record<PropertyKey, unknown>` and access is safe.
    return obj[key];
  }
  return undefined;
};

export const getAxiosErrorMessages = (error: unknown): string[] => {
  const errors: string[] = [];
  if (isAxiosError(error)) {
    error.response?.data.error.forEach((err: unknown) => {
      const paths = getField(err, "path")?.toString() ?? "";
      const msg = getField(err, "message")?.toString() ?? "";
      errors.push(`${msg} (${paths})`);
    });
  }
  return errors;
};
