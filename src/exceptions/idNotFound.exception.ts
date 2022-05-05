import { HttpStatus } from '../enums/httpStatus.enum';
import { HttpExceptions } from './httpExceptions.exception';

export class IdNotFoundException extends HttpExceptions {
  constructor(message = '') {
    super(HttpStatus.NOT_FOUND, message);
  }
}
