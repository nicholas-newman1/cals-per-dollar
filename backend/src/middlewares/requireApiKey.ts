import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const requireBearerToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.header("Authorization");
  const adminBearerToken = process.env.ADMIN_API_KEY;

  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required" });
  }

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid Authorization header format. Expected 'Bearer <token>'",
    });
  }

  if (token !== adminBearerToken) {
    console.log(token, adminBearerToken);
    return res.status(403).json({ message: "Invalid token" });
  }

  next();
};

export default requireBearerToken;
