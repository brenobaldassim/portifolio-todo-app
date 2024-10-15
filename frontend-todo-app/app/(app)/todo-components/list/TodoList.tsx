// src/components/TodoList.tsx
import React from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import CardItem from '../cards/CardItem';
import { Todo } from '../../utils/requests/requestsOperations';
import { ERROR_COLOR } from '../../utils/styles';

interface TodoListProps {
	todos: Todo[];
	loading: boolean;
	error: string | null;
	loadMoreTodos: () => void;
	isFetchingMore: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, loading, error, loadMoreTodos, isFetchingMore }) => {
	if (loading && !todos.length) {
		return <ActivityIndicator style={styles.loadingSpinner} size='large' color='#0000ff' />;
	}

	if (error) {
		return <Text style={{ color: ERROR_COLOR }}>Error: {error}</Text>;
	}

	if (!todos.length) {
		return <Text style={{ color: ERROR_COLOR }}>No todo data available</Text>;
	}

	return (
		<FlatList
			style={styles.flatList}
			data={todos}
			renderItem={({ item }) => <CardItem todo={item} />}
			keyExtractor={(item) => (item.id ? item.id.toString() : '')}
			onEndReached={loadMoreTodos}
			onEndReachedThreshold={0.5}
			ListFooterComponent={isFetchingMore ? <ActivityIndicator size='small' color='#0000ff' /> : null}
		/>
	);
};

const styles = StyleSheet.create({
	flatList: {
		width: '100%',
		minHeight: '60%',
		marginTop: 70,
		flex: 1,
	},
	loadingSpinner: {
		marginTop: 100,
	},
});

export default TodoList;
