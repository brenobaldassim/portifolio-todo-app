// src/repository/UserRepository.ts
import { Repository } from 'typeorm';
import { User } from '@src/entities/User';
import { AppDataSource } from '@src/data-source';

export class UserRepository extends Repository<User> {
	constructor() {
		super(User, AppDataSource.manager);
	}
	findByUsername(username: string): Promise<User | null> {
		return this.findOne({ where: { username } });
	}
}
