import { HttpStatus } from '../enums/httpStatus.enum';
import { HttpExceptions } from './httpExceptions.exception';

export class NoTokenError extends HttpExceptions {
  constructor(message = 'Your token is invalid or has expired') {
    super(HttpStatus.UNAUTHORIZED, message);
  }
}
