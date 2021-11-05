import { Schema, model } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: [Address];
}

export interface Address {
  country: string;
  state: string;
  street: string;
  city: string;
  roomNumber: string;
}

const addressSchema = new Schema<Address>(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    roomNumber: { type: String, required: false, default: "w/n" },
  },
  { _id: false }
);

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, default: "00" },
  address: [addressSchema],
});

export const UserModel = model<User>("User", userSchema);
