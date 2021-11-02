import { Router } from "express";
import { check } from "express-validator";

import {
  addAFurniture,
  deleteAFurnitureById,
  getAllFurnitures,
  modifyAFurnitureById,
  getAFurnitureById,
} from "../controllers/furniture.controller";
import { furnitureExistsById } from "../helpers/furniture-db-validators.helper";

import { fieldsValidator } from "../middlewares/field-validator.middlewares";

const router = Router();

router.get("/", getAllFurnitures);

router.get(
  "/:id",
  [check("id", "it is not a valid id").isMongoId(), fieldsValidator],
  getAFurnitureById
);

router.post(
  "/",
  [
    check("name", "The furniture name is required").not().isEmpty(),
    check("depthZ", "The furniture needs a depth").not().isEmpty(),
    check("depthZ", "The furniture depth must be a number").isNumeric(),
    check("heightX", "The furniture needs a height").not().isEmpty(),
    check("heightX", "The furniture height must be a number").isNumeric(),
    check("widthY", "The furniture needs a width").not().isEmpty(),
    check("widthY", "The furniture width must be a number").isNumeric(),
    check("wood", "The furniture must be specified with a wood type")
      .not()
      .isEmpty(),
    fieldsValidator,
  ],
  addAFurniture
);

router.put(
  "/:id",
  [
    check("id", "it is not a valid id").isMongoId(),
    fieldsValidator,
    check("id").custom(furnitureExistsById),
    fieldsValidator,
  ],
  modifyAFurnitureById
);

router.delete(
  "/:id",
  [
    check("id", "it is not a valid id").isMongoId(),
    fieldsValidator,
    check("id").custom(furnitureExistsById),
    fieldsValidator,
  ],
  deleteAFurnitureById
);

export default router;
