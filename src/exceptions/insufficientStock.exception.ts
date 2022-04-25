import { HttpExceptions } from "./httpExceptions.exception";
import { HttpStatus } from "../enums/httpStatus.enum";

export class InsufficientStockException extends HttpExceptions {
  constructor(message = "") {
    super(HttpStatus.NOT_FOUND, message);
  }
}
