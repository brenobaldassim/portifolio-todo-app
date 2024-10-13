import { Router } from 'express';
import { AuthenticationUserController } from '@src/controllers/AuthenticationUserController';
import { AuthenticationUserService } from '@src/services/AuthenticationUserService';

const userRouter = Router();
const authService = new AuthenticationUserService();
const authController = new AuthenticationUserController(authService);
userRouter.get('/', authController.findAll.bind(authController));
userRouter.get('/:id', authController.findById.bind(authController));
userRouter.post('/', authController.create.bind(authController));
userRouter.delete('/:id', authController.delete.bind(authController));
userRouter.post('/login', authController.login.bind(authController));

export { userRouter };
