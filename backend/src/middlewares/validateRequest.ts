import { Schema } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest = (
  schema: Schema,
  source: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.respond(false, "Validation failed", null, errors);
    }

    next();
  };
};

export default validateRequest;
