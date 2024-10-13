import { Request, Response, Router } from 'express';
import { TodoController } from '@src/controllers/TodoController';
import { authMiddleware } from '@src/middlewares/AuthMiddleware';
import { TodoServiceImpl } from '@src/services/impl/TodoServiceImpl';

const todoRouter = Router();
const todoService = new TodoServiceImpl();
const todoController = new TodoController(todoService);
todoRouter.use(authMiddleware);
todoRouter.get('/', todoController.findAll.bind(todoController));
todoRouter.get('/search', todoController.searchTodo.bind(todoController));
todoRouter.get('/:id', todoController.findById.bind(todoController));
todoRouter.post('/', todoController.create.bind(todoController));
todoRouter.delete('/:id', todoController.delete.bind(todoController));
todoRouter.patch('/:id', todoController.update.bind(todoController));

export { todoRouter };
