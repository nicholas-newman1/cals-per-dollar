import toCamelCase from "./toCamelCase";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export const createResponse = <T>(
  success: boolean,
  message: string,
  data: T | null = null,
  errors: ValidationError[] = []
): ApiResponse<T> => {
  const camelCasedData = data ? toCamelCase(data) : data;
  return {
    success,
    message,
    data: camelCasedData,
    errors,
  };
};
