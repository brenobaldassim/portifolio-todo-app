// src/entity/Task.ts

import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Base } from './Base';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@Entity()
export class Todo extends Base {
	@Column()
	@IsOptional()
	@IsNotEmpty({ message: 'Title should not be empty' })
	@IsString({ message: 'Title must be a string' })
	title: string;

	@Column('text')
	@IsOptional()
	@IsString({ message: 'Description must be a string' })
	description: string;

	@Column()
	@IsOptional()
	@IsString({ message: 'Status must be a string' })
	status: string;

	@ManyToOne(() => User, (user) => user.todos)
	user: User;
}
