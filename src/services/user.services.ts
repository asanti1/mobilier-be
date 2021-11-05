import { Request, Response } from "express";
import {
  getAllUsersRepository,
  getAUserByIdRepository,
  addAUserRepository,
  modifyAUserByIdRepository,
  deleteAUserByIdRepository,
  addAnUserAddressRepository,
} from "../repositories/user.repository";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getAllUsersRepository();
  return res.json(users);
};

export const getAUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getAUserByIdRepository(id);
  if (!user) return idNotFoundExc(id, res);
  return res.json(user);
};

export const addAUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address: [{ country, state, street, city, roomNumber }],
  } = req.body;
  await addAUserRepository({
    firstName,
    lastName,
    email,
    password,
    phone,
    address: [{ country, state, street, city, roomNumber }],
  })
    .then((user) => {
      res.json({ msg: "Success", user });
    })
    .catch((error) => {
      res.status(500).json({
        msg: "you are not seeing this, THIS IS A FEATURE, FUCK YOU CUNT",
        error,
      });
    });
};

export const addAnUserAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { country, state, street, city, roomNumber } = req.body;
  await addAnUserAddressRepository(id, {
    country,
    state,
    street,
    city,
    roomNumber,
  }).then((response) => {
    res.json(response);
  });
};

export const modifyAUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, password, phone } = req.body;
  const user = await modifyAUserByIdRepository(
    id,
    firstName,
    lastName,
    password,
    phone
  );
  if (!user) return idNotFoundExc(id, res);
  return res.json(user);
};

export const deleteAUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await deleteAUserByIdRepository(id);
  if (!deletedUser) return idNotFoundExc(id, res);
  return res.json({ deletedUser });
};

const idNotFoundExc = (id: string, res: Response) => {
  return res.status(404).json(`Id ${id} not found in database`);
};
