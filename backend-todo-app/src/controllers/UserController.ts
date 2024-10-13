import { NextFunction, Request, Response } from 'express';
import { GenericService } from '@src/utils/CustomTypes';
import { isPayloadValid } from '@src/utils/utils';
import { toUserDTO } from '@src/dtos';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { User } from '@src/entities/User';

export class UserController {
	protected readonly userService: GenericService;
	constructor(userService: GenericService) {
		this.userService = userService;
	}
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const payload: User = request.body;
			const skip: boolean = false;
			const isValid = await isPayloadValid<User>(response, payload, skip, User);
			if (!isValid) return;

			const { username, password } = request.body;
			const newUser: User = toUserDTO({ username, password });
			const result = await this.userService.create(newUser);

			response.status(HttpStatusCodes.CREATED).json({ message: 'User created', data: result });
		} catch (error) {
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const id: number = Number(request.params.id);
			const result = await this.userService.delete(id);
			response.status(HttpStatusCodes.OK).json({ message: 'User deleted', data: result });
		} catch (error) {
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			let users: User[] = await this.userService.findAll();
			response.status(HttpStatusCodes.OK).json({ message: 'Users found', data: users });
		} catch (error) {
			next(error);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			if (request.params.id) {
				const id: number = Number(request.params.id);
				let user: User = await this.userService.findById(id);
				response.status(HttpStatusCodes.OK).json({ message: 'User found', data: user });
			} else {
				throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'User id not found');
			}
		} catch (error) {
			next(error);
		}
	}
}
