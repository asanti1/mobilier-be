import { FurnitureModel } from "../models/furniture.model";

export const furnitureExistsById = async (id: string) => {
  const furnitureExists = await FurnitureModel.findById(id);
  if (!furnitureExists) {
    throw new Error(`Id ${id} not found in database `);
  }
};
