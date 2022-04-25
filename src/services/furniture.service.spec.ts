/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'bson';

import { getAFurnitureByIdRepository } from '../repositories/furniture.repository';
import { getAFurnitureById } from './furniture.services';

jest.mock('../repositories/furniture.repository');
jest.mock('mongoose');

describe('FurnitureService', () => {
  const id = new ObjectId();
  const jsonMock = jest.fn();

  const mockReq = {
    params: { id },
  };

  const mockRes: any = {
    status: () => ({ json: jsonMock }),
    json: jsonMock,
  };

  describe('getAFurnitureById', () => {
    it('should return a furniture', async () => {
      const spy = (getAFurnitureByIdRepository as jest.Mock).mockResolvedValueOnce({ something: 'value' } as any);

      await getAFurnitureById(mockReq as any, mockRes);

      expect(spy).toHaveBeenCalledWith(mockReq.params.id);
      expect(mockRes.json).toHaveBeenCalledWith({ something: 'value' });
    });

    it('should throw idNotFoundExc', async () => {
      const spy = (getAFurnitureByIdRepository as jest.Mock).mockResolvedValueOnce(null as any);

      await getAFurnitureById(mockReq as any, mockRes);

      expect(spy).toHaveBeenCalledWith(mockReq.params.id);
    });
  });
});
