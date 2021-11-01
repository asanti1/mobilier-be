import { model, Schema } from "mongoose";
import Furniture from "../interfaces/Furniture";

const furnitureSchema = new Schema<Furniture>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  depthZ: { type: Number, required: true },
  heightX: { type: Number, required: true },
  widthY: { type: Number, required: true },
  wood: { type: String, required: true },
});

export const FurnitureModel = model<Furniture>("Furniture", furnitureSchema);
