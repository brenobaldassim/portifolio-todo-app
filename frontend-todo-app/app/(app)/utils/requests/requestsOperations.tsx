import axios from 'axios';
import { Status } from '../utils';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Todo = {
	id?: number;
	title: string;
	description: string;
	status: string;
};

export type Search = {
	limit?: number;
	page?: number;
	status?: string;
};

export interface genericTodoFetchConfig {
	id?: number;
	search?: Search;
	setData: (data: any) => void;
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
}

export async function updateTodoRequest(todo: Todo) {
	try {
		const response = await axios.put(`${API_URL}/todos/${todo.id}`, {
			title: todo.title,
			description: todo.description,
			status: todo.status,
		});
		return response.data;
	} catch (error) {
		alert('Error updating todo');
		console.error(error);
	}
}

export async function deleteTodoRequest(id: number) {
	try {
		const response = await axios.delete(`${API_URL}/todos/${id}`);
		return response.data;
	} catch (error) {
		alert('Error deleting todo');
		console.error(error);
	}
}

export async function createTodoRequest(todo: Todo) {
	try {
		const response = await axios.post(`${API_URL}/todos`, {
			title: todo.title,
			description: todo.description,
			status: todo.status,
		});
		return response.data;
	} catch (error) {
		alert('Error creating todo');
		console.error(error);
	}
}

export async function getTodoByIdRequest(id: number) {
	try {
		const response = await axios.get(`${API_URL}/todos/${id}`);
		return response.data;
	} catch (error) {
		alert('Error fetching todos');
		console.error(error);
	}
}

export async function getTodosByCustomSearchRequest(query: string) {
	try {
		const response = await axios.get(`${API_URL}/todos/search/?${query}`);
		return response.data.data;
	} catch (error) {
		alert('Error fetching todos');
		console.error(error);
	}
}

export async function getTodosBySearchRequest(search: Search) {
	try {
		const response = await axios.get(
			`${API_URL}/todos/search/?limit=${search.limit || 1}&page=${search.page || 1}&status=${search.status || ''}`
		);
		return response.data.data;
	} catch (error) {
		alert('Error fetching todos');
		console.error(error);
	}
}

export const fetchTodo = async (config: genericTodoFetchConfig) => {
	try {
		let result;
		if (!config.id) result = await getTodosBySearchRequest(config.search || {});
		else result = await getTodoByIdRequest(config.id);
		config.setData(result.data);
		return result;
	} catch (error) {
		console.error(error);
		config.setError('Failed to fetch todo');
	} finally {
		config.setLoading(false);
	}
};
