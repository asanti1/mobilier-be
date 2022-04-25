import { NextFunction, Request, Response, Router } from 'express';
import { HttpStatus } from '../enums/httpStatus.enum';

import { SalesService } from '../services/sale.services';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { shopList, userID } = req.body;
  const service = SalesService.getInstance();

  try {
    const sale = await service.newSale(userID, shopList);
    res.status(HttpStatus.OK).json(sale);
  } catch (error) {
    next(error);
  }
});

export default router;
