import { Request, Response } from "express";
import { FurnitureModel } from "../schemas/furniture.schema";
import {
  addAFurnitureRepository,
  modifyAFurnitureByIdRepository,
  deleteAFurnitureByIdRepository,
  getAFurnitureByIdRepository,
} from "../repositories/furniture.repository";

export const getAllFurnitures = async (req: Request, res: Response) => {
  const furnitures = await FurnitureModel.find();
  return res.json(furnitures);
};

export const getAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const furniture = await getAFurnitureByIdRepository(id);
  if (!furniture) return idNotFoundExc(id, res);
  return res.json(furniture);
};

export const addAFurniture = async (req: Request, res: Response) => {
  const { name, depthZ, heightX, widthY, wood } = req.body;
  let { cost, stock, description } = req.body;
  if (!cost) cost = 0.0;
  if (!stock) stock = 0;
  if (!description) description = "no description";
  const furniture = {
    name,
    description,
    cost,
    stock,
    depthZ,
    heightX,
    widthY,
    wood,
  };
  await addAFurnitureRepository(furniture)
    .then((furniture) => {
      res.json({ msg: "Success", furniture });
    })
    .catch((error) => {
      res.status(500).json({
        msg: "you are not seeing this, THIS IS A FEATURE, FUCK YOU CUNT",
        error,
      });
    });
};

export const modifyAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cost, stock } = req.body;
  const furniture = await modifyAFurnitureByIdRepository(id, cost, stock);
  if (!furniture) return idNotFoundExc(id, res);
  return res.json(furniture);
};

export const deleteAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedFurniture = await deleteAFurnitureByIdRepository(id);
  if (!deletedFurniture) return idNotFoundExc(id, res);
  return res.json({ deletedFurniture });
};

const idNotFoundExc = (id: string, res: Response) => {
  return res.status(404).json(`Id ${id} not found in database`);
};
