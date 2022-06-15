import { IdNotFoundException } from '../../exceptions/idNotFound.exception';
import { InvalidLoginException } from '../../exceptions/invalidLogin.exception';
import { Pagination } from '../../interfaces/pagination.interfaces';
import { Address } from '../../user/interface/address.interfaces';
import { User } from '../interface/user.interfaces';
import { UserModel, UserDocument } from '../schema/user.schema';

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

  async getUserByEmail(email: string, password: string) {
    const user = await UserModel.findOne({ $and: [{ email: email, password: password }] });
    if (!user) throw new InvalidLoginException(`email or password are wrong, try again`);
    return user;
  }

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