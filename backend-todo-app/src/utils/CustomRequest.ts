import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
	user?: JwtPayload; // Optional because it may not always be set
}

export interface JwtPayload {
	id: number;
	username: string;
	// Add other fields as needed
}

export interface SearchQuery {
	status?: string;
	limit?: string;
	page?: string;
	userId?: number;
}

export interface Searchpagination {
	pageNumber: number;
	totalPages: number;
	limitNumber: number;
}
