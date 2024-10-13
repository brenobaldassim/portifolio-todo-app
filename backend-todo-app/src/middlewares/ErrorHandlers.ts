import { Request, Response, NextFunction } from 'express';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';

export function errorHandler(error: Error | ToDoAppErrors, request: Request, response: Response, next: NextFunction) {
	console.error(error);

	if (error instanceof ToDoAppErrors) {
		response.status(error.statusCode).type('application/json').send({ message: error.message });
		return;
	}

	response
		.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
		.type('application/json')
		.send({ message: 'Internal server error' });
}
