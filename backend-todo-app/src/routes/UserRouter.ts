import { Router } from 'express';
import { AuthenticationUserController } from '@src/controllers/AuthenticationUserController';
import { AuthenticationUserService } from '@src/services/AuthenticationUserService';

const userRouter = Router();
const authService = new AuthenticationUserService();
const authController = new AuthenticationUserController(authService);

userRouter.post('/register', authController.create.bind(authController));
userRouter.post('/login', authController.login.bind(authController));

export { userRouter };
