import { IdNotFoundException } from '../exceptions/idNotFound.exception';
import { Furniture } from '../interfaces/furniture.intefaces';
import { Pagination } from '../interfaces/pagination.interfaces';
import { FurnitureDocument, FurnitureModel } from '../schemas/furniture.schema';

export class FurnitureRepository {
  private static instance: FurnitureRepository;

  public static getInstance(): FurnitureRepository {
    if (!FurnitureRepository.instance) {
      FurnitureRepository.instance = new FurnitureRepository();
    }
    return FurnitureRepository.instance;
  }

  getAllFurnitures(pagination: Pagination, sorting: string) {
    return FurnitureModel.find().skip(pagination.page * pagination.size).limit(pagination.size).sort(sorting);
  }

  async getAFurnitureById(id: string): Promise<FurnitureDocument> {
    const furniture = await FurnitureModel.findById(id);
    if (!furniture) throw new IdNotFoundException(`id ${id} was not found in DB`);
    return furniture;
  }

  addAFurniture(furniture: Furniture): Promise<FurnitureDocument> {
    return FurnitureModel.create(furniture);
  }

  async modifyAFurnitureById(id: string, cost: number, stock: number) {
    const furniture = await FurnitureModel.findById(id);
    if (!furniture) throw new IdNotFoundException(`user with the id: ${id} was not found in DB`);
    return FurnitureModel.findByIdAndUpdate(id, { cost, stock });
    ;
  }

  async deleteAFurnitureById(id: string) {
    const deletedFurniture = await FurnitureModel.findByIdAndRemove(id);
    if (!deletedFurniture) throw new IdNotFoundException(`furniture with the id: ${id} not found`);
    return deletedFurniture;
  }
}
