import { HttpExceptions } from "./httpExceptions.exception";
import { HttpStatus } from "../enums/httpStatus.enum";

export class ItemNotFoundException extends HttpExceptions {
  constructor(message = "") {
    super(HttpStatus.NOT_FOUND, message);
  }
}
