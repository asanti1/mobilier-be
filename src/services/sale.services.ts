import { Item } from '../interfaces/item.interfaces';
import { SaleRepository } from '../repositories/sale.repository';
import { SaleDocument } from '../schemas/sale.schema';

export class SalesService {
  private static instance: SalesService;
  private repository: SaleRepository;

  constructor() {
    this.repository = SaleRepository.getInstance()
  }

  public static getInstance(): SalesService {
    if (!SalesService.instance) {
      SalesService.instance = new SalesService()
    }

    return SalesService.instance
  }

  newSale(userID: string, shopList: Item[]): Promise<SaleDocument> {
    return this.repository.newSale(userID, shopList)
  }
}
