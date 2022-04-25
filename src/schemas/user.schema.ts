import { Schema, model } from "mongoose";

import { User } from "../interfaces/user.interfaces";
import { addressSchema } from "./address.schema";

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, default: "00" },
  address: [addressSchema],
});

export type UserDocument = Document & User;


export const UserModel = model<UserDocument>("User", userSchema);
