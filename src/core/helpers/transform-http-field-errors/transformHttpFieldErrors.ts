const transformHttpFieldErrors = <T extends Record<string, string>>(
  errors: Array<{ field: string; error: string }>,
): T => {
  const result: Partial<T> = {};

  errors.forEach(({ field, error }) => {
    result[field as keyof T] = error as T[keyof T];
  });

  return result as T;
};

export default transformHttpFieldErrors;
