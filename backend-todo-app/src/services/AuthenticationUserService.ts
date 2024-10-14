// src/service/AuthenticationService.ts
import { UserServiceImpl } from './impl/UserServiceImpl';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';

export class AuthenticationUserService extends UserServiceImpl {
	async login(username: string, password: string) {
		const user = await this.userRepository.findByUsername(username);
		if (!user) {
			throw new ToDoAppErrors(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password');
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new ToDoAppErrors(HttpStatusCodes.UNAUTHORIZED, 'Invalid username or password');
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
			expiresIn: '8h',
		});
		return { token };
	}

	verifyToken(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET as string);
	}
}
