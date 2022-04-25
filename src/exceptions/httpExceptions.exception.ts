import { HttpStatus } from "../enums/httpStatus.enum";

export class HttpExceptions extends Error {
  constructor(public status: HttpStatus, message: string) {
    super(message);
  }
}
