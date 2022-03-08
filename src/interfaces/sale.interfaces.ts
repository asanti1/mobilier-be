import { IFurniture } from './furniture.intefaces';

export interface Sale {
  customer: string;
  shopList: [{ item: IFurniture; quantity: number }];
  date: number;
}
