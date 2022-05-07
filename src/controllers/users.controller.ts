import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';

import { HttpStatus } from '../enums/httpStatus.enum';
import { Address } from '../interfaces/address.interfaces';
import { Pagination } from '../interfaces/pagination.interfaces';
import { User } from '../interfaces/user.interfaces';
import { fieldsValidator, passwordExists } from '../middlewares/field-validator.middlewares';
import { UserService } from '../services/user.services';

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const pagination: Pagination = { page: Number(req.query.page as string) || 0, size: Number(req.query.size as string) || 5 };
  const sorting = req.query.sort_by as string || "+name";
  const service = UserService.getInstance();

  const users = await service.getAllUsers(pagination, sorting);

  res.status(HttpStatus.OK).json({ users: users });
});

router.get(
  "/:id",
  [check("id", "it is not a valid id").isMongoId(), fieldsValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const service = UserService.getInstance();

      const user = await service.getAUserById(id);

      res.status(HttpStatus.OK).json({ user: user });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  [
    check("firstName", "The first name is required").not().isEmpty(),
    check("lastName", "The last name is required").not().isEmpty(),
    check("email", "The email is required and must be a valid one").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    check("password", "Password too short, 8 characters minimum").isLength({
      min: 8,
    }),
    check("address.*.country", "The country is required").not().isEmpty(),
    check("address.*.state", "The state is required").not().isEmpty(),
    check("address.*.street", "The street is required").not().isEmpty(),
    check("address.*.city", "The city is required").not().isEmpty(),
    fieldsValidator,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, phone, address: [{ country, state, street, city, roomNumber }] } = req.body;
    const user: User = { firstName, lastName, email, password, phone, address: [{ country, state, street, city, roomNumber }] };
    const service = UserService.getInstance();

    const result = await service.addAUser(user);

    res.status(HttpStatus.CREATED).json({ result });
  });

router.put(
  "/address/:id",
  [
    check("id", "it is not a valid id").isMongoId(),
    check("country", "The country is required").not().isEmpty(),
    check("state", "The state is required").not().isEmpty(),
    check("street", "The street is required").not().isEmpty(),
    check("city", "The city is required").not().isEmpty(),
    fieldsValidator,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { country, state, street, city, roomNumber } = req.body;

    try {
      const address: Address = { country, state, street, city, roomNumber };
      const service = UserService.getInstance();

      const result = await service.addAnUserAddress(id, address);

      res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  [
    check("id", "it is not a valid id").isMongoId(),
    passwordExists,
    fieldsValidator,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { firstName, lastName, password, phone } = req.body;
    const user: User = { firstName, lastName, password, phone };

    try {
      const service = UserService.getInstance();

      const modifiedUser = await service.modifyAUserById(id, user);

      res.status(HttpStatus.OK).json({ modifiedUser });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  [check("id", "it is not a valid id").isMongoId(), fieldsValidator],
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const service = UserService.getInstance();

      await service.deleteAUserById(id);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
);
export default router;
