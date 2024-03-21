import { Request } from 'express';
import { IUserDocument } from 'src/users/interfaces/user.interface';

interface IRequest extends Request {
  user: IUserDocument;
}

export { IRequest };
