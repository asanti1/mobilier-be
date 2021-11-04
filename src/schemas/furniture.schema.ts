import { Schema, model } from "mongoose";

export interface Furniture {
  name: string;
  description: string;
  cost: number;
  stock: number;
  depthZ: number;
  heightX: number;
  widthY: number;
  wood: string;
}

const furnitureSchema = new Schema<Furniture>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  cost: { type: Number, required: false, default: 0.0 },
  stock: { type: Number, required: false, default: 0.0 },
  depthZ: { type: Number, required: true },
  heightX: { type: Number, required: true },
  widthY: { type: Number, required: true },
  wood: { type: String, required: true },
});

export const FurnitureModel = model<Furniture>("Furniture", furnitureSchema);
