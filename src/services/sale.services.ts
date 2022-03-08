import { Request, Response } from 'express';
import { addASaleRepository } from '../repositories/sale.repository';

export const addASale = (req: Request, res: Response) => {
  const customer = req.body.userID;
  const items: [] = req.body.items;

  addASaleRepository(customer, items);
};
