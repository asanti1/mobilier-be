import { Schema, model } from 'mongoose';
import { Sale } from '../interfaces/sale.interfaces';
import { FurnitureModel } from '../schemas/furniture.schema';

const saleSchema = new Schema<Sale>(
  {
    customer: { type: String, required: true },
    shopList: [{ FurnitureModel, quantity: Number, required: true }],
  },
  { timestamps: true }
);

export const SaleModel = model<Sale>('User', saleSchema);
