import { NextFunction, Request, Response } from "express";
import { NoTokenError } from "../exceptions/noToken.exception";

export const extractToken = (req: Request, res: Response, next: NextFunction) => {


  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      throw new NoTokenError();
    } else {
      const token = bearerHeader.split(" ")[1];

      res.locals.token = token;
      next();
    }
  } catch (error) {
    next(error);
  }
};