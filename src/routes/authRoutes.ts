import express from 'express';
import { authControllers } from '../controllers';
import { UserType } from '../enum';
import { authorizeTo } from '../middlewares/authorizeTo';
import verifyToken from '../middlewares/verifyToken';

const authRouter = express.Router();

authRouter.post('/register', authControllers.registerUser);
authRouter.post('/login', authControllers.loginUser);

// For Logged-in User
authRouter.get('/logout', verifyToken, authControllers.logoutUser);
authRouter.get('/me', verifyToken, authControllers.getMe);

// For Staff and Admin
authRouter.get(
  '/',
  verifyToken,
  authorizeTo([UserType.STAFF, UserType.ADMIN]),
  authControllers.getAllUsers,
);
authRouter.get(
  '/:id',
  verifyToken,
  authorizeTo([UserType.STAFF, UserType.ADMIN]),
  authControllers.getUserById,
);

// Only for Admin
authRouter.post(
  '/createUserByAdmin',
  verifyToken,
  authorizeTo([UserType.ADMIN]),
  authControllers.createUserByAdmin,
);
authRouter.post(
  '/updateUserType',
  verifyToken,
  authorizeTo([UserType.ADMIN]),
  authControllers.updateUserType,
);

export default authRouter;
