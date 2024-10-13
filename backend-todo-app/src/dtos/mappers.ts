import { Todo } from '@src/entities/Todo';
import { User } from '@src/entities/User';
import { TodoDTO } from './dtos';
import { UserDTO } from './dtos';

export function toUserDTO({ username: username, password: password }: UserDTO): User {
	const user = new User();
	user.username = username;
	user.password = password;
	return user;
}

export function toTodoDTO({ title: title, description: description, status: status, user: user }: TodoDTO): Todo {
	const todo = new Todo();
	todo.title = title;
	todo.description = description;
	todo.status = status;
	todo.user = user;
	return todo;
}
