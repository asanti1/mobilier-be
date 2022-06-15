import { Roles } from "../enums/roles.enum";
import { InvalidRoleException } from "../exceptions/invalidRole.exception";

interface Payload {
  firstName: string;
  lastName: string;
  role: Roles;
}

export const validRole = (admittedRoles: Roles[], payload: Payload): void => {
  if (admittedRoles.includes(payload.role)) return;
  throw new InvalidRoleException();
};