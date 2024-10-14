import { useState, useEffect } from 'react';
import { fetchTodo } from '../requests/requestsOperations';

interface Info {
	id?: number;
	setData: (todo: any) => void;
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
}

const useFetch = (info: Info) => {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetchTodo(info);
	}, []);

	return [data];
};

export default useFetch;
