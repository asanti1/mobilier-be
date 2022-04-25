import { Address } from "./address.interfaces";

export interface User {
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  phone: string;
  address?: [Address];
}

