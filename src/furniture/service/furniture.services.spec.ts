import { Furniture } from '../interface/furniture.intefaces';
import { FurnitureRepository } from '../repository/furniture.repository';
import { FurnitureService } from '../service/furniture.services';

describe(FurnitureService.name, () => {
  const service = FurnitureService.getInstance();
  const repository = FurnitureRepository.getInstance();

  const mockReturnedFurniture: Furniture = {
    'name': 'Sarasa',
    'description': 'Sarasa',
    'cost': 10,
    'stock': 10,
    'depthZ': 10,
    'heightX': 10,
    'widthY': 10,
    'wood': 'roble'
  };


  const mockModifiedReturnedFurniture: Furniture = {
    'name': 'Sarasa',
    'description': 'Sarasa',
    'cost': 12,
    'stock': 50,
    'depthZ': 10,
    'heightX': 10,
    'widthY': 10,
    'wood': 'roble'
  };

  const fakemongoId = '6182d4536c14b74a5f7dfb2f';

  test('service.getAFurnitureById', async () => {
    const spy = jest.spyOn(repository, 'getAFurnitureById').mockResolvedValueOnce(mockReturnedFurniture as any);

    const furniture = await service.getAFurnitureById(fakemongoId);

    expect(spy).toHaveBeenCalled();
    expect(furniture).toEqual(mockReturnedFurniture);
  });

  test('service.getAllFurnitures', async () => {
    const spy = jest.spyOn(repository, 'getAllFurnitures').mockResolvedValueOnce([mockReturnedFurniture] as any);

    const furnitures = await service.getAllFurnitures({} as any, "");

    expect(spy).toHaveBeenCalled();
    expect(furnitures).toEqual([mockReturnedFurniture]);
  });

  it('service.addAFurniture ', async () => {
    const spy = jest.spyOn(repository, 'addAFurniture').mockResolvedValueOnce([mockReturnedFurniture] as any);

    const furnitures = await service.addAFurniture(mockReturnedFurniture);

    expect(spy).toHaveBeenCalled();
    expect(furnitures).toEqual([mockReturnedFurniture]);
  });

  test('service.modifyAFurnitureById ', async () => {
    const spy = jest.spyOn(repository, 'modifyAFurnitureById').mockResolvedValueOnce([mockModifiedReturnedFurniture] as any);

    const modifiedFurniture = await service.modifyAFurnitureById(fakemongoId, 12, 50);

    expect(spy).toHaveBeenCalled();
    expect(modifiedFurniture).not.toEqual([mockReturnedFurniture]);
  });

  test('service.deleteAFurnitureById ', async () => {
    const spy = jest.spyOn(repository, 'deleteAFurnitureById').mockResolvedValueOnce({} as any);

    const deletedFurniture = await service.deleteAFurnitureById('6182d4536c14b74a5f7dfb2f');

    expect(spy).toHaveBeenCalled();
    expect(deletedFurniture).toEqual({});
  });
});
