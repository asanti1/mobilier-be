import { IdNotFoundException } from '../../exceptions/idNotFound.exception';
import { Address } from '../interface/address.interfaces';
import { User } from '../interface/user.interfaces';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../schema/user.schema';

jest.mock('../schemas/user.schema');

describe(UserRepository.name, () => {
  const repository = UserRepository.getInstance();
  const fakeId = '6182d4536c14b74a5f7dfb2f';
  const fakeUser: User = {
    'firstName': 'Sarasa',
    'lastName': 'Doe',
    'password': 'password',
    'phone': "123456789",
  };

  describe('getAllUsers', () => {
    test('should call getAllUsers', () => {
      repository.getAllUsers({} as any, "");

      expect(UserModel.find).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    test('should call getUserById', async () => {
      const spy = jest.spyOn(UserModel, 'findById').mockReturnValueOnce({} as any);

      await repository.getUserById(fakeId);

      expect(spy).toHaveBeenCalledWith(fakeId);
    });

    test('should throw IdNotFoundException given a non existent id in db', async () => {
      const obtainedUser = repository.getUserById('fakeId');

      return expect(obtainedUser).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });

  describe('addAUser', () => {
    test('should call addAUser ', () => {
      const spy = jest.spyOn(UserModel, 'create').mockReturnValueOnce({} as any);

      repository.addAUser(fakeUser);

      expect(spy).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe('addAnAddress', () => {
    const fakeAddress: Address = {
      'country': "Argentina",
      'state': "Buenos Aires",
      'street': " Av 1",
      'city': 'La Plata',
      'roomNumber': "5"
    };
    test('should call addAnAddress', async () => {
      const spyFindById = jest.spyOn(UserModel, 'findById').mockResolvedValue({} as any);
      const spyUpdateOne = jest.spyOn(UserModel, 'updateOne').mockResolvedValue({} as any);

      await repository.addAnAddress(fakeId, fakeAddress);

      expect(spyFindById).toHaveBeenCalledWith(fakeId);
      expect(spyUpdateOne).toHaveBeenCalled();
    });

    test('should throw IdNotFoundException given a non existent id in db', async () => {
      const addedAddress = repository.addAnAddress('fakeId', fakeAddress);

      return expect(addedAddress).rejects.toBeInstanceOf(IdNotFoundException);
    });

  });

  describe('modifyUserById', () => {
    test('should call modifyUserById', async () => {
      const spyFindById = jest.spyOn(UserModel, 'findById').mockResolvedValue({} as any);
      const spyFindByIdAndUpdate = jest.spyOn(UserModel, 'findByIdAndUpdate').mockResolvedValue({} as any);

      await repository.modifyUserById(fakeId, fakeUser);

      expect(spyFindById).toHaveBeenCalledWith(fakeId);
      expect(spyFindByIdAndUpdate).toHaveBeenCalled();
    });

    test('should throw IdNotFoundException given a non existent id in db', async () => {
      const modifiedUserById = repository.modifyUserById('fakeId', fakeUser);

      return expect(modifiedUserById).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });

  describe('deleteUserById', () => {
    test('should call deleteUserById', async () => {
      const spyFindByIdAndRemove = jest.spyOn(UserModel, 'findByIdAndRemove').mockResolvedValue({} as any);

      await repository.deleteUserById(fakeId);

      expect(spyFindByIdAndRemove).toHaveBeenCalledWith(fakeId);
    });

    test('should throw IdNotFoundException given a non existent id in db', async () => {
      const deletedUser = repository.deleteUserById('fakeId');

      return expect(deletedUser).rejects.toBeInstanceOf(IdNotFoundException);
    });
  });
});