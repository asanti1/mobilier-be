import { Router } from 'express';
import { check } from 'express-validator';

import {
  getAllUsers,
  getAUserById,
  addAUser,
  modifyAUserById,
  deleteAUserById,
  addAnUserAddress,
} from '../services/user.services';
import { fieldsValidator, passwordExists } from '../middlewares/field-validator.middlewares';

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', [check('id', 'it is not a valid id').isMongoId(), fieldsValidator], getAUserById);

router.post(
  '/',
  [
    check('firstName', 'The first name is required').not().isEmpty(),
    check('lastName', 'The last name is required').not().isEmpty(),
    check('email', 'The email is required and must be a valid one').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'Password too short, 8 characters minimum').isLength({
      min: 8,
    }),
    check('address.*.country', 'The country is required').not().isEmpty(),
    check('address.*.state', 'The state is required').not().isEmpty(),
    check('address.*.street', 'The street is required').not().isEmpty(),
    check('address.*.city', 'The city is required').not().isEmpty(),
    fieldsValidator,
  ],
  addAUser
);

router.put(
  '/address/:id',
  [
    check('id', 'it is not a valid id').isMongoId(),
    check('country', 'The country is required').not().isEmpty(),
    check('state', 'The state is required').not().isEmpty(),
    check('street', 'The street is required').not().isEmpty(),
    check('city', 'The city is required').not().isEmpty(),
    fieldsValidator,
  ],
  addAnUserAddress
);

router.put(
  '/:id',
  [check('id', 'it is not a valid id').isMongoId(), passwordExists, fieldsValidator],

  modifyAUserById
);

router.delete('/:id', [check('id', 'it is not a valid id').isMongoId(), fieldsValidator], deleteAUserById);

export default router;
