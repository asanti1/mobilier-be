import { IdNotFoundExc } from '../exceptions/idNotFound.exception';
import { Furniture } from '../interfaces/furniture.intefaces';
import { FurnitureModel } from '../schemas/furniture.schema';

export class FurnitureRepository {
  private static instance: FurnitureRepository;

  public static getInstance(): FurnitureRepository {
    if (!FurnitureRepository.instance) {
      FurnitureRepository.instance = new FurnitureRepository();
    }
    return FurnitureRepository.instance;
  }

  async getAFurnitureById(id: string) {
    const furniture = await FurnitureModel.findById(id);
    if (!furniture) throw new IdNotFoundExc(`id ${id} was not found in DB`);
    return furniture;
  }

  getAllFurnitures() {
    return FurnitureModel.find();
  }

  addAFurniture(furniture: Furniture) {
    return FurnitureModel.create(furniture);
  }

  async modifyAFurnitureById(id: string, cost: number, stock: number) {
    const furniture = await FurnitureModel.findById(id);
    if (!furniture) throw new IdNotFoundExc(`user with the id: ${id} was not found in DB`);
    return FurnitureModel.findByIdAndUpdate(id, { cost, stock });
    ;
  }

  async deleteAFurnitureById(id: string) {
    const deletedFurniture = await FurnitureModel.findByIdAndRemove(id);
    if (!deletedFurniture) throw new IdNotFoundExc(`furniture with the id: ${id} not found`);
    return deletedFurniture;
  }
}
