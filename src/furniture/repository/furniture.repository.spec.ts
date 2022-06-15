import { IdNotFoundException } from '../../exceptions/idNotFound.exception';
import { Furniture } from '../interface/furniture.intefaces';
import { FurnitureModel } from '../schema/furniture.schema';
import { FurnitureRepository } from '../repository/furniture.repository';


jest.mock("../schemas/furniture.schema");

describe(FurnitureRepository.name, () => {
  const repository = FurnitureRepository.getInstance();
  const fakeId = '6182d4536c14b74a5f7dfb2f';

  describe('getAllFurnitures', () => {
    test('should call  getAllFurnitures', async () => {
      await repository.getAllFurnitures({} as any, "");

      expect(FurnitureModel.find).toHaveBeenCalled();
    });
  });

  describe('getAFurnitureById', () => {
    test('should call getAFurnitureById', async () => {
      const spy = jest.spyOn(FurnitureModel, 'findById').mockReturnValueOnce({} as any);

      await repository.getAFurnitureById(fakeId);

      expect(spy).toHaveBeenCalledWith(fakeId);
    });

    test('should throw IdNotFoundException given an invalid MongoID', () => {
      const furn = repository.getAFurnitureById('badID');

      return expect(furn).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });

  describe('addAFurniture', () => {
    const furnToBeAdded: Furniture = {
      'name': 'Sarasa2',
      'description': 'Sarasa2',
      'cost': 11,
      'stock': 11,
      'depthZ': 11,
      'heightX': 11,
      'widthY': 11,
      'wood': 'roble'
    };
    test('should call addAFurniture with furnToBeAdded', () => {
      const spy = jest.spyOn(FurnitureModel, 'create').mockReturnValueOnce({} as any);

      repository.addAFurniture(furnToBeAdded);

      expect(spy).toHaveBeenCalledWith(furnToBeAdded);
    });
  });

  describe('modifyAFurnitureById', () => {
    const fakeCost = 20;
    const fakeStock = 20;
    test('should call modifyAFurnitureById correctly', async () => {
      const spyFindById = jest.spyOn(FurnitureModel, 'findById').mockResolvedValue({} as any);
      const spyFindByIdAndUpdate = jest.spyOn(FurnitureModel, 'findByIdAndUpdate').mockReturnValueOnce({} as any);

      await repository.modifyAFurnitureById(fakeId, fakeCost, fakeStock);

      expect(spyFindById).toHaveBeenCalledWith(fakeId);
      expect(spyFindByIdAndUpdate).toHaveBeenCalled();
    });

    test('should throw IdNotFoundExceptionCorrectly', async () => {
      const furn = repository.modifyAFurnitureById('badID', fakeCost, fakeStock);

      return expect(furn).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });

  describe('deleteAFurnitureById', () => {
    test('should call deleteAFurnitureById', async () => {
      const spyFindByIdAndRemove = jest.spyOn(FurnitureModel, 'findByIdAndRemove').mockResolvedValue({} as any);

      await repository.deleteAFurnitureById(fakeId);

      expect(spyFindByIdAndRemove).toHaveBeenCalledWith(fakeId);
    });

    test('should throw IdNotFoundExceptionCorrectly', async () => {
      const furn = repository.deleteAFurnitureById('badID');

      return expect(furn).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });
});

