import { AppDataSource } from '../db';
import CreateUserDto from '../dto/CreateUserDto';
import LoginUserDto from '../dto/LoginUserDto';
import UpdateUserTypeDto from '../dto/UpdateUserTypeDto';
import { User } from '../entities/User';
import { UserType } from '../enum';
import { throwError } from '../middlewares/errorHandler';
import { comparePassword, hashPassword } from '../utils/hashUtils';
import { generateToken } from '../utils/jwtUtils';

const userRepository = AppDataSource.getRepository(User);

// --------------------------------------------------
// CREATE USER
// --------------------------------------------------
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const existing = await userRepository.findOne({
    where: { email: userData.email },
  });

  if (existing) {
    return throwError('Email already exists', 409);
  }

  const hashed = await hashPassword(userData.password);

  const newUser = userRepository.create({
    name: userData.name,
    email: userData.email,
    password: hashed,
    userType: userData.userType || UserType.CUSTOMER,
  });

  const savedUser = await userRepository.save(newUser);
  return savedUser;
};

// --------------------------------------------------
// LOGIN USER
// --------------------------------------------------
export const loginUser = async (
  credentials: LoginUserDto,
): Promise<{ user: User; token: string }> => {
  const { email, password } = credentials;

  const user = await userRepository.findOne({ where: { email } });

  if (!user) return throwError('User not found', 404);

  const matchPassword = await comparePassword(password, user.password);

  if (!matchPassword) return throwError('Invalid password', 401);

  const token = generateToken({
    id: user.id,
    UserType: user.userType,
  });

  return { user, token };
};

// --------------------------------------------------
// UPDATE USER TYPE
// --------------------------------------------------
export const updateUserType = async (
  data: UpdateUserTypeDto,
): Promise<User> => {
  const user = await userRepository.findOne({ where: { id: data.userId } });

  if (!user) return throwError('User not found', 404);

  user.userType = data.UserType;

  const updated = await userRepository.save(user);
  return updated;
};

// --------------------------------------------------
// GET ALL USERS
// --------------------------------------------------
export const getAllUsers = async (): Promise<User[]> => {
  const users = await userRepository.find();
  return users;
};

// --------------------------------------------------
// GET USER BY ID
// --------------------------------------------------
export const getUserById = async (id: string): Promise<User> => {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) return throwError('User not found', 404);
  return user;
};

// --------------------------------------------------
// DELETE USER
// --------------------------------------------------
export const deleteUser = async (id: string): Promise<void> => {
  const result = await userRepository.delete({ id });
  if (result.affected === 0) return throwError('User not found', 404);
};
