import { AuthenticationUserService } from '@src/services/AuthenticationUserService';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { UserController } from './UserController';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';

export class AuthenticationUserController extends UserController {
	protected readonly authService: AuthenticationUserService;
	constructor(authService: AuthenticationUserService) {
		super(authService);
		this.authService = authService;
	}

	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const { username, password } = request.body;
			const result = await this.authService.login(username, password);
			response.json({
				message: 'Login successful',
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}
}
