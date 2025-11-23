import { UserType } from './entities/User';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}
