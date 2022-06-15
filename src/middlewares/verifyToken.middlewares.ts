import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { payload } = jwt.verify(res.locals.token, process.env.JWT_TOKEN!, { complete: true, ignoreExpiration: false });

    console.log(payload);
    

    res.locals.payload = payload;

    next();
  } catch (error) {
    next(error);
  }
};