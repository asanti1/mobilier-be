import { Request, Response } from "express";
import { FurnitureModel } from "../models/furniture.model";
import { furnitureExistsById } from "../helpers/furniture-db-validators.helper";

export const getAllFurnitures = async (req: Request, res: Response) => {
  const furnitures = await FurnitureModel.find();
  res.json(furnitures);
};

export const addAFurniture = async (req: Request, res: Response) => {
  const { name, depthZ, heightX, widthY, wood } = req.body;
  let { cost, stock, description } = req.body;
  if (!cost) cost = 0.0;
  if (!stock) stock = 0;
  if (!description) description = "no description";
  const furniture = new FurnitureModel({
    name,
    description,
    cost,
    stock,
    depthZ,
    heightX,
    widthY,
    wood,
  });

  await furniture.save();
  res.json({ msg: "Added Successfully", furniture });
};

export const modifyAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cost } = req.body;
  const furniture = await FurnitureModel.findByIdAndUpdate(id, { cost });

  res.json(furniture);
};

export const deleteAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedFurniture = await FurnitureModel.findByIdAndRemove(id);

  res.json({ deletedFurniture });
};

export const getAFurnitureById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const furniture = await FurnitureModel.findById(id);
  if (furniture) res.json({ furniture });
  else res.json([]);
};
