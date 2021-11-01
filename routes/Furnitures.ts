import { Router } from "express";
import { deleteAFurnitureById } from "../controllers/Furniture";
import {
  getAllFurnitures,
  addAFurniture,
  modifyAFurnitureById,
} from "../controllers/Furniture";

const router = Router();

router.get("/", getAllFurnitures);

router.post("/", addAFurniture);

router.put("/:id", modifyAFurnitureById);

router.delete("/:id", deleteAFurnitureById);

export default router;
