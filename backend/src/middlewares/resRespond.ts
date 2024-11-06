import { NextFunction, Request, Response } from "express";

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
  return {
    success,
    message,
    data,
    errors,
  };
};

const resRespond = (_req: Request, res: Response, next: NextFunction) => {
  res.respond = function <T>(
    success: boolean,
    message: string,
    data: T | null = null,
    errors: ValidationError[] = []
  ) {
    this.json(createResponse(success, message, data, errors));
  };
  next();
};

export default resRespond;
