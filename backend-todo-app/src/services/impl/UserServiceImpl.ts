import { UserRepository } from '@src/repositories/UserRepository';
import { UserService } from '@src/services/UserService';
import bcrypt from 'bcrypt';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { DeleteResult } from 'typeorm';
import { isIdValid } from '@src/utils/utils';
import { User } from '@src/entities/User';

export class UserServiceImpl implements UserService {
	protected readonly userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}
	async findAll(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async findById(id: number): Promise<User> {
		isIdValid(id);
		const user: User | null = await this.userRepository.findOneBy({ id: id });
		if (!user) {
			throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'User not found');
		}
		return user;
	}

	async create(userData: Partial<User>) {
		if (!userData.username || !userData.password) {
			throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'Username or password not found');
		}
		const existingUser: User | null = await this.userRepository.findOne({ where: { username: userData.username } });
		if (existingUser) {
			throw new ToDoAppErrors(HttpStatusCodes.CONFLICT, 'Username already exists');
		}
		const hashedPassword = await bcrypt.hash(userData.password as string, 10);
		const user = new User();
		user.username = userData.username as string;
		user.password = hashedPassword;

		return this.userRepository.save(user);
	}

	async delete(id: number): Promise<DeleteResult> {
		isIdValid(id);
		return await this.userRepository.delete(id);
	}

	async update(user: User, newUser: User): Promise<User> {
		if (!newUser) {
			throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'User empty');
		}
		isIdValid(user.id);
		this.userRepository.merge(user, newUser);
		return await this.userRepository.save(user);
	}
}
