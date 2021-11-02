import { Router } from "express";
import { deleteAFurnitureById } from "../controllers/furniture.controller";
import {
  getAllFurnitures,
  addAFurniture,
  modifyAFurnitureById,
} from "../controllers/furniture.controller";

const router = Router();

router.get("/", getAllFurnitures);

router.post("/", addAFurniture);

router.put("/:id", modifyAFurnitureById);

router.delete("/:id", deleteAFurnitureById);

export default router;
