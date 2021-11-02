import {} from "mongoose";
import { Request, Response } from "express";
import { FurnitureModel } from "../models/furniture.model";

export const getAllFurnitures = async (req: Request, res: Response) => {
  const furnitures = await FurnitureModel.find();
  res.json(furnitures);
};

export const addAFurniture = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, description, cost, depthZ, heightX, widthY, wood } = req.body;
  const furniture = new FurnitureModel({
    name,
    description,
    cost,
    depthZ,
    heightX,
    widthY,
    wood,
  });

  await furniture.save();
  console.log("done");
  res.json({ msg: "OK" });
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
