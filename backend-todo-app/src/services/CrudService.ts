import { DeleteResult } from 'typeorm';

export interface CrudService<ID, T> {
	findAll(userId?: ID): Promise<T[]>;
	findById(id: ID, userId?: ID): Promise<T | null>;
	create(entity: T): Promise<T>;
	delete(id: ID): Promise<DeleteResult>;
	update(entity: T, newEntity: T): Promise<T>;
}
