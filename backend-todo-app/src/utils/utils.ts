import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Searchpagination } from '@src/utils/CustomRequest';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { ToDoAppErrors } from './ToDoAppErrors';
import { plainToInstance } from 'class-transformer';

export function retriveToken(token: string): string {
	const posicaoToken = 1;
	if (!token) return '';
	return token.split(' ')[posicaoToken] as string;
}

export async function isPayloadValid<T extends object>(
	response: Response,
	payload: Partial<T>,
	skip: boolean,
	entity: new () => T
): Promise<Boolean> {
	try {
		const instance: T = plainToInstance(entity, payload);
		const errors = await validate(instance, {
			whitelist: true,
			forbidNonWhitelisted: true,
			skipMissingProperties: skip,
		});
		const isValid: boolean = errors.length == 0;
		if (!isValid) {
			throw new ToDoAppErrors(HttpStatusCodes.BAD_REQUEST, 'Error validating data');
		}
		return isValid;
	} catch (error) {
		throw new ToDoAppErrors(HttpStatusCodes.FORBIDDEN, 'Error ' + error);
	}
}

export function setNextPage(request: Request, response: Response, search: Searchpagination) {
	return search.pageNumber < search.totalPages
		? `${request.protocol}://${request.get('host')}${request.baseUrl}${request.path}?page=${
				search.pageNumber + 1
		  }&limit=${search.limitNumber}`
		: null;
}

export function isIdValid(id: number) {
	let isValid: boolean = !isNaN(id) && id > 0;
	if (!id) throw new ToDoAppErrors(HttpStatusCodes.NOT_FOUND, 'Id not found');
	else if (isNaN(id)) throw new ToDoAppErrors(HttpStatusCodes.BAD_REQUEST, 'Id not valid');

	return isValid;
}
