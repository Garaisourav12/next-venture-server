import { NextFunction, Request, Response } from 'express';
import CreateUserDto from '../dto/CreateUserDto';
import LoginUserDto from '../dto/LoginUserDto';
import UpdateUserTypeDto from '../dto/UpdateUserTypeDto';
import { authServices } from '../services';
import { isProd } from '../utils/envUtils';
import { safetyWrapper } from '../utils/safetyUtils';
import { validateInput } from '../utils/validationUtils';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const userData = await validateInput(CreateUserDto, {
      ...req.body,
      UserType: 'USER',
    });

    const user = await authServices.createUser(userData);

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      data: user,
    });
  }, next);
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const credentials = await validateInput(LoginUserDto, req.body);

    const { user, token } = await authServices.loginUser(credentials);

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: isProd(),
        sameSite: isProd() ? 'none' : 'strict',
      })
      .json({
        message: 'User logged in successfully',
        success: true,
        data: user,
      });
  }, next);
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    res
      .status(200)
      .clearCookie('token', {
        httpOnly: true,
        secure: isProd(),
        sameSite: isProd() ? 'none' : 'strict',
      })
      .json({
        message: 'User logged out successfully',
        success: true,
      });
  }, next);
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    // @ts-ignore
    const user = await authServices.getUserById(req.user.id);

    res.status(200).json({
      message: 'User fetched successfully',
      success: true,
      data: user,
    });
  }, next);
};

export const createUserByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const userData = await validateInput(CreateUserDto, req.body);

    const user = await authServices.createUser(userData);

    res.status(201).json({
      message: 'User created successfully',
      success: true,
      data: user,
    });
  }, next);
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const users = await authServices.getAllUsers();

    res.status(200).json({
      message: 'Users fetched successfully',
      success: true,
      data: users,
    });
  }, next);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const user = await authServices.getUserById(req.params.id);

    res.status(200).json({
      message: 'User fetched successfully',
      success: true,
      data: user,
    });
  }, next);
};

export const updateUserType = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    const data = await validateInput(UpdateUserTypeDto, req.body);

    const user = await authServices.updateUserType(data);

    res.status(200).json({
      message: 'UserType updated successfully',
      success: true,
      data: user,
    });
  }, next);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await safetyWrapper(async () => {
    await authServices.deleteUser(req.params.id);

    res.status(200).json({
      message: 'User deleted successfully',
      success: true,
      data: null,
    });
  }, next);
};
