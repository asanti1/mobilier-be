import { Address } from '../interfaces/address.interfaces';
import { User } from '../interfaces/user.interfaces';
import { UserModel } from '../schemas/user.schema';

export const getAllUsersRepository = async () => {
  return await UserModel.find();
};

export const getAUserByIdRepository = async (id: string) => {
  return await UserModel.findById(id);
};

export const addAUserRepository = async (user: User) => {
  const u = new UserModel(user);
  return await u.save();
};

export const modifyAUserByIdRepository = async (
  id: string,
  firstName: string,
  lastName: string,
  password: string,
  phone: string
) => {
  return await UserModel.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      password,
      phone,
    },
    { new: true }
  );
};

export const addAnUserAddressRepository = async (id: string, address: Address) => {
  return await UserModel.updateOne({ _id: id }, { $push: { address } });
};

export const deleteAUserByIdRepository = async (id: string) => {
  return await UserModel.findByIdAndRemove(id);
};
