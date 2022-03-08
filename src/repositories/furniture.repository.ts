import { FurnitureModel } from '../schemas/furniture.schema';
import { Document } from 'mongoose';

export async function getAllFurnituresRepository() {
  return await FurnitureModel.find();
}

export async function getAFurnitureByIdRepository(id: string) {
  return await FurnitureModel.findById(id);
}

export async function addAFurnitureRepository(furniture: Document) {
  return await furniture
    .save()
    .then(document => {
      return document;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export async function modifyAFurnitureByIdRepository(id: string, cost: number, stock: number) {
  return await FurnitureModel.findByIdAndUpdate(id, { cost, stock });
}

export async function deleteAFurnitureByIdRepository(id: string) {
  return await FurnitureModel.findByIdAndRemove(id);
}
