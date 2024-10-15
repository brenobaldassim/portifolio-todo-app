// src/screens/Home.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import TodoList from './todo-components/list/TodoList';
import AddTodoButton from './todo-components/buttons/AddTodoButton';
import useTodos from './utils/hooks/useTodos';
import GLOBAL_STYLYING from './utils/styles';

const Home = () => {
	const { todos, loading, error, loadMoreTodos, isFetchingMore } = useTodos();

	return (
		<View style={[styles.body, GLOBAL_STYLYING.bg_color]}>
			<Stack.Screen options={{ title: 'TodoApp', headerShown: true }} />
			<View style={styles.wrapper}>
				<TodoList
					todos={todos}
					loading={loading}
					error={error}
					loadMoreTodos={loadMoreTodos}
					isFetchingMore={isFetchingMore}
				/>
				<AddTodoButton />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		position: 'relative',
	},
	wrapper: {
		width: '100%',
		minHeight: 600,
		padding: 20,
		flex: 1,
	},
});

export default Home;
