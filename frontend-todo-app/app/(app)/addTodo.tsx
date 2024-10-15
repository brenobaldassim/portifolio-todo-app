import { View, Text } from 'react-native';
import React from 'react';
import TodoForms from './todo-components/forms/TodoForms';
import { StyleSheet } from 'react-native';
import GLOBAL_STYLYING from './utils/styles';
import { createTodoRequest } from './utils/requests/requestsOperations';

const addTodo = () => {
	return (
		<View style={[styles.body, styles.wrapper, GLOBAL_STYLYING.bg_color]}>
			<TodoForms fetchFunction={createTodoRequest} />
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		padding: 20,
	},
	wrapper: {
		width: '100%',
		paddingTop: 84,
	},
});

export default addTodo;
