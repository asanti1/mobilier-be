import { Item } from '../../interfaces/item.interfaces';
import { SaleRepository } from '../repository/sale.repository';
import { SalesService } from '../service/sale.services';


describe(SalesService.name, () => {
  const service = SalesService.getInstance();
  const repository = SaleRepository.getInstance();
  const userId: string = 'VALIDID';
  const shopList: Item[] = [{ _id: '1', quantity: 1 }, { _id: '2', quantity: 2 }, { _id: '3', quantity: 3 }];

  describe('newSale', () => {
    test('should call with correct arguments newSale', () => {
      const spy = jest.spyOn(repository, 'newSale').mockResolvedValueOnce({} as any);

      service.newSale(userId, shopList);

      expect(spy).toHaveBeenCalledWith(userId, shopList);
    });
  });

});