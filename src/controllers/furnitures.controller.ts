import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { HttpStatus } from '../enums/httpStatus.enum';
import { Furniture } from '../interfaces/furniture.intefaces';
import { Pagination } from '../interfaces/pagination.interfaces';

import { fieldsValidator } from '../middlewares/field-validator.middlewares';
import { FurnitureService } from '../services/furniture.services';

const router = Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const pagination: Pagination = { page: Number(req.query.page as string) || 0, size: Number(req.query.size as string) || 5 };
  const sorting = req.query.sort_by as string || "+name";
  const service = FurnitureService.getInstance();

  const furnitures = await service.getAllFurnitures(pagination, sorting);

  res.status(HttpStatus.OK).json({ page: pagination.page, size: pagination.size, data: furnitures });
});

router.get('/:id', [check('id', 'it is not a valid id').isMongoId(), fieldsValidator], async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const service = FurnitureService.getInstance();
  
  try {
    const furniture = await service.getAFurnitureById(id);
    res.status(HttpStatus.OK).json({ furniture });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  [
    check('name', 'The furniture name is required').not().isEmpty(),
    check('depthZ', 'The furniture needs a depth').not().isEmpty(),
    check('depthZ', 'The furniture depth must be a number').isNumeric(),
    check('heightX', 'The furniture needs a height').not().isEmpty(),
    check('heightX', 'The furniture height must be a number').isNumeric(),
    check('widthY', 'The furniture needs a width').not().isEmpty(),
    check('widthY', 'The furniture width must be a number').isNumeric(),
    check('wood', 'The furniture must be specified with a wood type').not().isEmpty(),
    fieldsValidator,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const service = FurnitureService.getInstance();
    const { name, depthZ, heightX, widthY, wood, cost, stock, description } = req.body;
    const furniture: Furniture = { name, depthZ, heightX, widthY, wood, cost, stock, description };

    try {
      const addedFurniture = await service.addAFurniture(furniture);
      res.status(HttpStatus.CREATED).json({ addedFurniture });
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', [check('id', 'it is not a valid id').isMongoId(), fieldsValidator], async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { cost, stock } = req.body;

  try {
    const service = FurnitureService.getInstance();
    const modifiedFurniture = await service.modifyAFurnitureById(id, cost, stock);
    res.status(HttpStatus.OK).json({ modifiedFurniture });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', [check('id', 'it is not a valid id').isMongoId(), fieldsValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const service = FurnitureService.getInstance();

    try {
      const deletedFurniture = await service.deleteAFurnitureById(id);
      res.status(HttpStatus.NO_CONTENT).send('');
    } catch (error) {
      next(error);
    }
  });

export default router;