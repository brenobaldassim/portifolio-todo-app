import { TodoRepository } from '@src/repositories/TodoRepository';
import { TodoService } from '@src/services/TodoService';
import { DeleteResult } from 'typeorm';
import { Todo } from '@src/entities/Todo';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { isIdValid, isStatusValid } from '@src/utils/utils';
import { STATUS } from '@src/utils/constants';

export class TodoServiceImpl implements TodoService {
	protected readonly todoRepository: TodoRepository;

	constructor() {
		this.todoRepository = new TodoRepository();
	}
	async findAll(userId: number): Promise<Todo[]> {
		isIdValid(userId);
		return await this.todoRepository.find({ where: { user: { id: userId } } });
	}

	async findById(id: number, userId: number): Promise<Todo> {
		isIdValid(id);
		isIdValid(userId);
		const todo: Todo | null = await this.todoRepository.findOne({
			relations: ['user'],
			where: { id: id, user: { id: userId } },
		});
		if (!todo) {
			throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'Todo item not found');
		}

		return todo;
	}

	async create(todo: Todo): Promise<Todo> {
		if (!todo) {
			throw new ToDoAppErrors(HttpStatusCodes.BAD_REQUEST, 'Todo is empty');
		} else if (!todo.title) {
			throw new ToDoAppErrors(HttpStatusCodes.BAD_REQUEST, 'Todo has no title');
		}
		isStatusValid(todo.status);

		return await this.todoRepository.save(todo);
	}

	async delete(id: number): Promise<DeleteResult> {
		isIdValid(id);
		return await this.todoRepository.delete(id);
	}

	async update(todo: Todo | null, newTodo: Partial<Todo>): Promise<Todo> {
		if (!todo) throw new Error('todo empty');
		if (!newTodo) {
			throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'todo empty');
		}
		isIdValid(todo.id);
		if (newTodo.status) isStatusValid(newTodo.status);
		this.todoRepository.merge(todo, newTodo);
		return await this.todoRepository.save(todo);
	}
	async searchTodo(userId: number, page: number, limit: number, status?: string): Promise<[Todo[], number]> {
		isIdValid(userId);
		if (status) isStatusValid(status);
		let search: Partial<[Todo[], number]> = [[], 0];
		let skip: number = (page - 1) * limit;
		if (isNaN(skip) || skip < 0) skip = 0;
		search = await this.todoRepository.searchTodos(userId, limit, status, skip);

		return search as [Todo[], number];
	}
}
