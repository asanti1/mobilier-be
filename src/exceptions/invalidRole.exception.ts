import { HttpStatus } from '../enums/httpStatus.enum';
import { HttpExceptions } from './httpExceptions.exception';

export class InvalidRoleException extends HttpExceptions {
  constructor(message = `You don't have permission to see this content`) {
    super(HttpStatus.FORBIDDEN, message);
  }
}
