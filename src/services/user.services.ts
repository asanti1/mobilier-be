import { Address } from '../interfaces/address.interfaces';
import { User } from '../interfaces/user.interfaces';
import { UserRepository } from '../repositories/user.repository';
export class UserService {
  private static instance: UserService;
  private repository: UserRepository;

  constructor() {
    this.repository = UserRepository.getInstance();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  getAllUsers() {
    return this.repository.getAllUsers();
  };

  getAUserById(id: string) {
    return this.repository.getUserById(id);
  };

  addAUser(user: User) {
    return this.repository.addAUser(user);
  };

  addAnUserAddress(id: string, address: Address) {
    return this.repository.addAnAddress(id, address);
  };

  modifyAUserById(id: string, user: User) {
    return this.repository.modifyUserById(id, user);
  };

  deleteAUserById(id: string) {
    return this.repository.deleteUserById(id);
  };
}