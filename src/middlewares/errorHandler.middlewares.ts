import { Application, NextFunction, Request, Response } from "express";

import { HttpStatus } from "../enums/httpStatus.enum";
import { HttpExceptions } from "../exceptions/httpExceptions.exception";

export const errorHandlerMiddleware = (app: Application) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(
    (err: HttpExceptions, _: Request, res: Response, __: NextFunction) => {
      return res
        .status(err.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  );
};
