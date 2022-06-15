import { HttpStatus } from '../enums/httpStatus.enum';
import { HttpExceptions } from './httpExceptions.exception';

export class InvalidLoginException extends HttpExceptions {
  constructor(message = '') {
    super(HttpStatus.BAD_REQUEST, message);
  }
}
