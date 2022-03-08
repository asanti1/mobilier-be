import { Schema, model } from 'mongoose';
import { IFurniture } from '../interfaces/furniture.intefaces';

const furnitureSchema = new Schema<IFurniture>({
  name: { type: String, required: true },
  description: { type: String, required: false, default: 'no description' },
  cost: { type: Number, required: false, default: 0 },
  stock: { type: Number, required: false, default: 0 },
  depthZ: { type: Number, required: true },
  heightX: { type: Number, required: true },
  widthY: { type: Number, required: true },
  wood: { type: String, required: true },
});

export const FurnitureModel = model<IFurniture>('Furniture', furnitureSchema);
