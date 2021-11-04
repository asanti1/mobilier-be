import { FurnitureModel, Furniture } from "../schemas/furniture.schema";

export const getAllFurnituresRepository = async () => {
  return await FurnitureModel.find();
};

export const getAFurnitureByIdRepository = async (id: string) => {
  return await FurnitureModel.findById(id);
};

export const addAFurnitureRepository = async (furniture: Furniture) => {
  const x = new FurnitureModel(furniture);
  return await x.save();
};

export const modifyAFurnitureByIdRepository = async (
  id: string,
  cost: number,
  stock: number
) => {
  return await FurnitureModel.findByIdAndUpdate(id, { cost, stock });
};

export const deleteAFurnitureByIdRepository = async (id: string) => {
  return await FurnitureModel.findByIdAndRemove(id);
};
