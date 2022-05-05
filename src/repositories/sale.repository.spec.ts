import { ObjectId } from 'bson';
import { startSession } from 'mongoose';
import { InsufficientStockException } from '../exceptions/insufficientStock.exception';
import { ItemNotFoundException } from '../exceptions/itemNotFound.exceptions';
import { SaleRepository } from '../repositories/sale.repository';
import { FurnitureModel } from '../schemas/furniture.schema';
import { SaleModel } from '../schemas/sale.schema';

jest.mock('mongoose', () => {
  const mongoose = jest.requireActual('mongoose');

  return {
    ...mongoose,
    startSession: jest.fn(),
  };
});

describe(SaleRepository.name, () => {
  const repository = SaleRepository.getInstance();
  const userId = new ObjectId().toHexString();
  let findFurnitureByIdSpy: jest.SpyInstance;
  let createSaleSpy: jest.SpyInstance;
  let sessionSpy: jest.SpyInstance;
  const saveMock = jest.fn();

  beforeEach(() => {
    findFurnitureByIdSpy = jest
      .spyOn(FurnitureModel, 'findById')
      .mockResolvedValue({
        _id: '012345678912',
        quantity: 1,
        stock: 5,
        name: '1',
        save: saveMock,
      } as any);
    createSaleSpy = jest
      .spyOn(SaleModel, 'create')
      .mockImplementation(() => { });
  });

  it('should create a Sale', async () => {
    const sessionMock = {
      withTransaction: jest.fn((cb) => cb()),
      endSession: jest.fn(),
    };

    sessionSpy = (startSession as jest.Mock).mockResolvedValue(sessionMock);

    await repository.newSale(userId, [{ _id: '012345678912', quantity: 1 }]);

    expect(findFurnitureByIdSpy).toHaveBeenCalledWith('012345678912', {
      name: 1,
      stock: 1,
    });
    expect(saveMock).toHaveBeenCalledTimes(1);

    expect(createSaleSpy).toHaveBeenCalledWith({
      customer: userId,
      shopList: [{ _id: '012345678912', quantity: 1 }],
    });

    expect(sessionSpy).toHaveBeenCalled();
    expect(sessionMock.withTransaction).toHaveBeenCalled();
    expect(sessionMock.endSession).toHaveBeenCalled();
  });

  it('should throw ItemNotFoundException', async () => {
    const sessionMock = {
      withTransaction: jest.fn((cb) => cb()),
      endSession: jest.fn(),
    };

    (startSession as jest.Mock).mockResolvedValue(sessionMock);
    findFurnitureByIdSpy.mockResolvedValueOnce(null);

    try {
      await repository.newSale(userId, [{ _id: '012345678912', quantity: 1 }]);
    } catch (error) {
      expect(error).toBeInstanceOf(ItemNotFoundException);
    }
    expect.assertions(1);
  });

  it('should throw InsufficientStockException', () => {
    const sessionMock = {
      withTransaction: jest.fn((cb) => cb()),
      endSession: jest.fn(),
    };

    (startSession as jest.Mock).mockResolvedValue(sessionMock);
    findFurnitureByIdSpy.mockResolvedValueOnce({
      _id: '012345678912',
      quantity: 5,
      stock: 1,
      name: '1',
      save: saveMock,
    } as any);

    const promise = repository.newSale(userId, [
      { _id: '012345678912', quantity: 5 },
    ]);

    return expect(promise).rejects.toBeInstanceOf(InsufficientStockException);
  });
});