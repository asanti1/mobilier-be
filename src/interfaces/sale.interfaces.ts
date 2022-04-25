export interface Sale {
  customer: string;
  shopList: [{ itemId: string; quantity: number }];
  date: number;
}
