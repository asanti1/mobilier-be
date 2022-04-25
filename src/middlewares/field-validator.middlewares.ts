import { NextFunction, Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { HttpStatus } from '../enums/httpStatus.enum';


const errorFormatter = ({ msg }: ValidationError) => {
  return msg;
};

export const fieldsValidator = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.status(HttpStatus.BAD_REQUEST).json({ errors: result.mapped() });
  }
  next();
};

export const passwordExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (password && password.length <= 8)
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ msg: "password field must be at least 8 characters long" });

  next();
};
