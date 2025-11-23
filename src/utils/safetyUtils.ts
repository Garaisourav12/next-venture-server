import { NextFunction } from 'express';

export const safetyWrapper = async (
  fn: () => Promise<void>,
  next: NextFunction,
) => {
  try {
    await fn();
  } catch (error) {
    next(error);
  }
};
