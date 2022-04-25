import { startSession } from 'mongoose';

import { InsufficientStockException } from '../exceptions/insufficientStock.exception';
import { ItemNotFoundException } from '../exceptions/itemNotFound.exceptions';
import { Item } from '../interfaces/item.interfaces';
import { FurnitureModel } from '../schemas/furniture.schema';
import { SaleDocument, SaleModel } from '../schemas/sale.schema';

export class SalesRepository {
  private static instance: SalesRepository;

  public static getInstance(): SalesRepository {
    if (!SalesRepository.instance) {
      SalesRepository.instance = new SalesRepository();
    }

    return SalesRepository.instance;
  }

  async newSale(userID: string, shopList: Item[]): Promise<SaleDocument> {
    const session = await startSession();

    await session.withTransaction(async () => {
      await Promise.all(
        shopList.map(async ({ _id, quantity }) => {
          const item = await FurnitureModel.findById(_id, {
            name: 1,
            stock: 1,
          });
          if (!item) throw new ItemNotFoundException(`The item with the id: ${_id} was not found`);

          if (item.stock < quantity)
            throw new InsufficientStockException(`Insufficient stock for ${item.name}, id: ${_id}`);

          item.stock -= quantity;

          await item.save();
        })
      );
    });

    await session.endSession();

    return await SaleModel.create({
      customer: userID,
      shopList: shopList,
    });
  }
}
