import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useState } from 'react';
import DeleteButton from '../todo-components/buttons/DeleteButton';
import { useLocalSearchParams } from 'expo-router';
import TodoForms from '../todo-components/forms/TodoForms';
import { updateTodoRequest, fetchTodo } from '../utils/requests/requestsOperations';

const todo = () => {
	const params = useLocalSearchParams();
	const [todo, setTodo] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const id: number = Number(params.id);
		fetchTodo({ id, setData: setTodo, setLoading, setError });
	}, [params.id]);

	if (loading) return <ActivityIndicator style={styles.loadingSpinner} size='large' color='#0000ff' />;
	if (error) return <Text>Error: {error}</Text>;
	if (!todo) return <Text>No todo data available</Text>;
	return (
		<View style={styles.body}>
			<DeleteButton id={todo?.id} />
			<TodoForms
				itemTitle={todo?.title}
				itemDescription={todo?.description}
				itemStatus={todo?.status}
				id={todo?.id}
				fetchFunction={updateTodoRequest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingSpinner: {
		marginTop: 100,
	},
	body: {
		flex: 1,
		backgroundColor: '#25292e',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	description: {
		minHeight: 150,
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
		marginBottom: 12,
	},
	delete: {
		marginTop: 12,
	},
});

export default todo;
