import { Router } from 'express';
import { todoRouter } from './TodoRouter';
import { userRouter } from './UserRouter';
const router = Router();

router.use('/todos', todoRouter);
router.use('/users', userRouter);

export { router };
