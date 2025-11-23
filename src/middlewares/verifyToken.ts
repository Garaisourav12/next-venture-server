import { NextFunction, Request, Response } from 'express';
import { verifyToken as verifyJWTToken } from '../utils/jwtUtils';
import { throwError } from './errorHandler';

const verifyToken = (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; // Token from cookie

    if (!token) {
      throwError('Token not found', 401);
    }

    const user: any = verifyJWTToken(token);

    if (!user || !user.id) {
      throwError('Invalid token', 401);
    }

    // @ts-ignore
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
