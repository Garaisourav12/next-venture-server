import { NextFunction, Request, Response } from 'express';
import { UserType } from '../enum';
import { throwError } from './errorHandler';

export const authorizeTo = (UserTypes: UserType[]) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      if (!UserTypes.includes(req.user.UserType)) {
        throwError('You are not authorized to access this route', 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
