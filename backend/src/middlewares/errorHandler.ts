import { Request, Response } from "express";
import { createResponse } from "../utils/responseUtil";

const errorHandler = (err: any, _req: Request, res: Response) => {
  console.error(err.stack);

  res
    .status(500)
    .json(
      createResponse<null>(false, "Internal server error", null, [
        { field: "general", message: err.message },
      ])
    );
};

export default errorHandler;
