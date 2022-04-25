import { Schema } from "mongoose";
import { Address } from "../interfaces/address.interfaces";
export const addressSchema = new Schema<Address>(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    roomNumber: { type: String, required: false, default: "w/n" },
  },
  { _id: false }
);
