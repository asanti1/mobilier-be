import { Schema, model } from "mongoose";

import { User } from "../interface/user.interfaces";
import { addressSchema } from "./address.schema";

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, default: "00" },
  role: {type: String, required: false, default: "USER"},
  address: [addressSchema],
});

export type UserDocument = Document & User;


export const UserModel = model<UserDocument>("User", userSchema);
