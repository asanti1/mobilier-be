import { Address } from '../interface/address.interfaces';
import { Pagination } from '../../interfaces/pagination.interfaces';
import { User } from '../interface/user.interfaces';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import "dotenv/config";

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

  
  getAllUsers(pagination: Pagination, sorting: string) {
    return this.repository.getAllUsers(pagination, sorting);
  };


  getAUserById(id: string) {
    return this.repository.getUserById(id);
  };


  async getAUserByEmail(email: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, process.env.SALT);
    const data = await this.repository.getUserByEmail(email, hashedPassword);

    const { firstName, lastName, role } = data;

    //10m
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (10 * 60), payload: { firstName, lastName, role } }, process.env.JWT_TOKEN!);

    return token;
  }

  addAUser(user: User) {
    user.password = bcrypt.hashSync(user.password, process.env.SALT);
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