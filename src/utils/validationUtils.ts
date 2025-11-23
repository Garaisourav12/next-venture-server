import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { throwError } from '../middlewares/errorHandler';

export const validateInput = async <T extends object>(
  DtoClass: new () => T,
  inputData: any,
): Promise<T> => {
  // Convert plain object → DTO instance
  const dto = plainToInstance(DtoClass, inputData);

  // Validate DTO
  const errors = await validate(dto);

  if (errors.length > 0) {
    const firstError = Object.values(errors[0].constraints ?? {})[0];
    throwError(firstError || 'Bad request', 400);
  }

  return dto;
};
