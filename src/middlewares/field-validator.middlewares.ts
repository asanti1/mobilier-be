import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

export const passwordExists = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password && password.length <= 8)
    return res.status(400).json({ msg: 'password field must be at least 8 characters long' });

  next();
};
