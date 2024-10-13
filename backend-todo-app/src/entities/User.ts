import { Entity, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsDefined } from 'class-validator';
import { Base } from './Base';
import { Todo } from './Todo';

@Entity()
export class User extends Base {
	@Column({ nullable: false })
	@IsNotEmpty({ message: 'username should not be empty' })
	@IsString({ message: 'username must be a string' })
	username: string;

	@Column({ nullable: false })
	@IsNotEmpty({ message: 'password should not be empty' })
	@IsString({ message: 'password must be a string' })
	password: string;

	@OneToMany(() => Todo, (todo) => todo.user)
	todos: Todo[];
}
