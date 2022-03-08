import { Document } from 'mongoose';
import { IFurniture } from '../interfaces/furniture.intefaces';
import { Item } from '../interfaces/item.interfaces';
import { FurnitureModel } from '../schemas/furniture.schema';

export const addASaleRepository = async (customerId: string, items: Item[]) => {
  const ids: string[] = [];

  items.forEach(item => ids.push(item._id));

  const affectedFurnituresFromDB = await FurnitureModel.find({ _id: { $in: ids } });

  const furnituresWithPositiveStock: Document<any, any, IFurniture>[] = [];
  affectedFurnituresFromDB.forEach((furniture, index) => {
    if (furniture._id === items[index]._id && furniture.stock - items[index].quantity >= 0) {
      // furniture.stock -= items[index].quantity;
      items[index].quantity = furniture.stock - items[index].quantity;
      furnituresWithPositiveStock.push(furniture);
    }
  });

  if (furnituresWithPositiveStock.length === affectedFurnituresFromDB.length) {
    return await FurnitureModel.updateMany({ _id: furnituresWithPositiveStock. }, { stock: items.$.quantity });
  } else {
    console.log('failed');
  }
  /*  
  ORIGINAL
  const furnituresWithPositiveStock: Document<any, any, IFurniture>[] = [];
  affectedFurnituresFromDB.forEach((furniture, index) => {
    if (furniture.id === items[index].id && furniture.stock - items[index].quantity >= 0) {
      furniture.stock -= items[index].quantity;
      furnituresWithPositiveStock.push(furniture);
    }
  });

  if (furnituresWithPositiveStock.length === affectedFurnituresFromDB.length) {
    return await FurnitureModel.updateMany({ _id: { $in: furnituresWithPositiveStock } });
  } else {
    console.log('failed');
  } */
};
