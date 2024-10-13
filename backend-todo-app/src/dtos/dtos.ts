import { User } from '@src/entities/User';
export interface UserDTO {
	username: string;
	password: string;
}

export interface TodoDTO {
	title: string;
	description: string;
	status: string;
	user: User;
}
