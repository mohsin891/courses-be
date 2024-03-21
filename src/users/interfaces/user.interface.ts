import { Document, Model } from 'mongoose';
import { User } from '../schemas/user.entity';

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}
export interface IUserStatics {
  isEmailTaken(email: string): Promise<boolean>;
}

type IUserDocument = Document & User;

type IUserModel = Model<IUserDocument>;
export { IUserDocument, IUserModel };
