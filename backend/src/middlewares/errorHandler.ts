import { Request, Response } from "express";

const errorHandler = (err: any, _req: Request, res: Response) => {
  console.error(err.stack);

  res.respond(false, "Internal server error", null, [
    { field: "general", message: err.message },
  ]);
};

export default errorHandler;
