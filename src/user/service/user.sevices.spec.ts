import { Address } from '../interface/address.interfaces';
import { User } from '../interface/user.interfaces';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.services';


const fakeUser: User = {
  'firstName': 'Sarasa',
  'lastName': 'Doe',
  'password': 'password',
  'phone': "123456789",
};

const fakeAddress: Address = {
  'country': "Argentina",
  'state': "Buenos Aires",
  'street': " Av 1",
  'city': 'La Plata',
  'roomNumber': "5"
};
describe(UserService.name, () => {
  const service = UserService.getInstance();
  const repository = UserRepository.getInstance();

  describe('getAllUsers', () => {
    test('should call getAllUsers', () => {
      const spy = jest.spyOn(repository, 'getAllUsers').mockResolvedValueOnce({} as any);

      service.getAllUsers({} as any, "");

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getAUserById', () => {
    test('should call getAllUsers', () => {
      const spy = jest.spyOn(repository, 'getUserById').mockResolvedValueOnce({} as any);

      service.getAUserById('FAKE_ID');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('addAUser', () => {
    test('should call addAUser', () => {
      const spy = jest.spyOn(repository, 'addAUser').mockResolvedValueOnce({} as any);

      service.addAUser(fakeUser);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('addAnUserAddress', () => {
    test('should call addAnAddress', () => {
      const spy = jest.spyOn(repository, 'addAnAddress').mockResolvedValueOnce({} as any);

      service.addAnUserAddress('FAKE_ID', fakeAddress);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('modifyAUserById', () => {
    test('should call modifyAUserById', () => {
      const spy = jest.spyOn(repository, 'modifyUserById').mockResolvedValueOnce({} as any);

      service.modifyAUserById('FAKE_ID', fakeUser);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('deleteAUserById', () => {
    test('should call deleteAUserById', () => {
      const spy = jest.spyOn(repository, 'deleteUserById').mockResolvedValueOnce({} as any);

      service.deleteAUserById('FAKE_ID');

      expect(spy).toHaveBeenCalled();
    });
  });
});