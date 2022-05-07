import { IdNotFoundException } from '../exceptions/idNotFound.exception';
import { Address } from '../interfaces/address.interfaces';
import { Pagination } from '../interfaces/pagination.interfaces';
import { User } from '../interfaces/user.interfaces';
import { UserModel } from '../schemas/user.schema';

export class UserRepository {
  private static instance: UserRepository;

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  getAllUsers(pagination: Pagination, sorting: string) {
    return UserModel.find().skip(pagination.page * pagination.size).limit(pagination.size).sort(sorting);
  };

  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw new IdNotFoundException(`user with the id: ${id} was not found in DB`);
    return user;
  };

  addAUser(user: User) {
    return UserModel.create(user);
  };

  async addAnAddress(id: string, address: Address) {
    const user = await UserModel.findById(id);
    if (!user) throw new IdNotFoundException(`user with the id: ${id} was not found in DB`);
    const updatedUser = UserModel.updateOne({ _id: id }, { $push: { address } }, { new: true });
    return updatedUser;
  };

  async modifyUserById(id: string, { firstName, lastName, password, phone }: User) {
    const user = await UserModel.findById(id);
    if (!user) throw new IdNotFoundException(`user with the id: ${id} was not found in DB`);
    return UserModel.findByIdAndUpdate(id, { firstName, lastName, password, phone }, { new: true });;
  };

  async deleteUserById(id: string) {
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (!deletedUser) throw new IdNotFoundException(`user with the id: ${id} not found`);
    return deletedUser;
  };
}