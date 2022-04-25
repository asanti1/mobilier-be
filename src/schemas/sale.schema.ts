import { Document, model, Schema } from 'mongoose';

import { Sale } from '../interfaces/sale.interfaces';

const saleSchema = new Schema<Sale>(
  {
    customer: { type: String, required: true },
    shopList: [{ itemId: String, quantity: Number }],
  },
  { timestamps: true }
);

export type SaleDocument = Document & Sale;

export const SaleModel = model<SaleDocument>('Sale', saleSchema);
