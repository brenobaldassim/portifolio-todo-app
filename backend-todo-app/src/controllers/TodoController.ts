import { Request, Response, NextFunction } from 'express';
import { TodoServiceImpl } from '@src/services/impl/TodoServiceImpl';
import { AuthenticatedRequest, SearchQuery } from '@src/utils/CustomRequest';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { toTodoDTO } from '@src/dtos';
import { Todo } from '@src/entities/Todo';
import { User } from '@src/entities/User';
import { isIdValid, isPayloadValid, setNextPage } from '@src/utils/utils';

export class TodoController {
	protected readonly todoService: TodoServiceImpl;
	constructor(todoservice: TodoServiceImpl) {
		this.todoService = todoservice;
	}
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const payload: Todo = request.body;
			const skip: boolean = true;
			const isValid = await isPayloadValid<Todo>(response, payload, skip, Todo);
			if (!isValid) return;

			const userId = (request as AuthenticatedRequest).user?.id ?? 0;
			const user: User = { id: userId } as User;
			const todo: Todo = toTodoDTO({ ...payload, user });
			const result = await this.todoService.create(todo);

			response.status(HttpStatusCodes.CREATED).json({ message: 'Todo created', data: result });
		} catch (error) {
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const id: number = Number(request.params.id);
			const result = await this.todoService.delete(id);
			response.status(HttpStatusCodes.OK).json({ message: 'Todo deleted', data: result });
		} catch (error) {
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const userId = (request as AuthenticatedRequest).user?.id ?? 0;
			const todos: Todo[] = await this.todoService.findAll(userId);
			response.json({ message: 'Todos found', data: todos });
		} catch (error) {
			next(error);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			const id: number = Number(request.params.id);
			const userId: number = (request as AuthenticatedRequest).user?.id ?? 0;
			const todos: Todo = await this.todoService.findById(id, userId);
			response.status(HttpStatusCodes.OK).json({ message: 'Todo found', data: todos });
		} catch (error) {
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const payload: Partial<Todo> = request.body;
			const skip: boolean = true;
			const isValid = await isPayloadValid<Todo>(response, payload, skip, Todo);
			if (!isValid) return;

			const id: number = Number(request.params.id);
			const userId: number = (request as AuthenticatedRequest).user?.id ?? 0;
			const todo: Todo = await this.todoService.findById(id, userId);
			const newTodo: Todo = await this.todoService.update(todo, payload);

			response.status(HttpStatusCodes.OK).json({ message: 'Todo updated', data: newTodo });
		} catch (error) {
			next(error);
		}
	}

	async searchTodo(request: Request, response: Response, next: NextFunction) {
		try {
			const userId: number = (request as AuthenticatedRequest).user?.id ?? 0;
			const searchQuery: SearchQuery = request.query as SearchQuery;
			const { status, limit = 0, page = 0 } = searchQuery;

			const pageNumber = parseInt(page as string, 10);
			const limitNumber = parseInt(limit as string, 10);

			const [todos, total]: [Todo[], number] = await this.todoService.searchTodo(
				userId,
				pageNumber,
				limitNumber,
				status
			);
			const totalPages = Math.ceil(total / limitNumber);
			const nextPage = setNextPage(request, response, { totalPages, pageNumber, limitNumber });
			response
				.status(HttpStatusCodes.OK)
				.json({ data: { totalItems: total, totalPages: totalPages, nextPage: nextPage, data: todos } });
		} catch (error) {
			next(error);
		}
	}
}
