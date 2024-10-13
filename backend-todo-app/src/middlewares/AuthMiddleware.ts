// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { retriveToken } from '@src/utils/utils';
import jwt from 'jsonwebtoken';
import { HttpStatusCodes } from '@src/utils/HttpStatusCodes';
import { ToDoAppErrors } from '@src/utils/ToDoAppErrors';
import { AuthenticatedRequest, JwtPayload } from '@src/utils/CustomRequest';

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
	try {
		const authHeader: string = request.headers.authorization as string;
		const token: string = authHeader && retriveToken(authHeader);
		if (!token) {
			throw new ToDoAppErrors(HttpStatusCodes.UNAUTHORIZED, 'Access token missing');
		}
		const decodedJWT = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
		(request as AuthenticatedRequest).user = decodedJWT;
		next();
	} catch (error) {
		next(error);
	}
}
