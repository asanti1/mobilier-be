import { Address } from '../../user/interface/address.interfaces';

export interface User {
  firstName: string;
  lastName: string;
  email?: string;
  password: string;
  phone: string;
  role?: string;
  address?: [Address];
}

