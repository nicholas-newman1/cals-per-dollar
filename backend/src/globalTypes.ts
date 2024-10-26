import "express";
import { ValidationError } from "./utils/responseUtil";

declare module "express" {
  interface Request {
    locals?: {
      validatedData?: Record<string, any>;
    };
  }
}

declare module "express-serve-static-core" {
  interface Response {
    respond: <T>(
      success: boolean,
      message: string,
      data?: T | null,
      errors?: ValidationError[]
    ) => void;
  }
}