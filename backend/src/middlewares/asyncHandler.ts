import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request<any, any, any, any>,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // Automatically catch any errors and pass them to next()
  };
};

export default asyncHandler;
