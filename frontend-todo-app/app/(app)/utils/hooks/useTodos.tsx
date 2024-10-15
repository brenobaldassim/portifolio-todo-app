import { useEffect, useState } from 'react';
import { Search, Todo, fetchTodo } from '../requests/requestsOperations';
import { StatusSearch, Status } from '../utils';

const useTodos = (status: string) => {
	const initialSatus: string = status === StatusSearch.ALL ? StatusSearch.ALL : status;
	const [todos, setTodos] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [search, setSearch] = useState<Search>({ limit: 8, page: 1, status: initialSatus });
	const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

	useEffect(() => {
		const newSearch = { limit: 8, page: 1, status: status };
		setSearch(newSearch);
		const result = fetchTodo({ setData: setTodos, setLoading, setError, search: newSearch });
		result.then((result) => setNextPage(result.nextPage));
	}, [status]);

	const setAfterLoad = (newTodos: Todo[]) => {
		setTodos((prevTodos) => {
			const filteredTodos = newTodos.filter(
				(newTodo) => !prevTodos.some((prevTodo) => prevTodo.id === newTodo.id)
			);
			return [...prevTodos, ...filteredTodos];
		});
	};

	const loadMoreTodos = () => {
		if (!nextPage || isFetchingMore) return;

		setIsFetchingMore(true);
		const newSearch = { ...search, page: (search.page ?? 1) + 1 };
		setSearch(newSearch);
		const result = fetchTodo({
			setData: setAfterLoad,
			setLoading: setIsFetchingMore,
			setError,
			search: newSearch,
		});
		result.then((result) => {
			setNextPage(result.nextPage);
			setIsFetchingMore(false);
		});
	};

	return { todos, loading, error, isFetchingMore, loadMoreTodos };
};

export default useTodos;
