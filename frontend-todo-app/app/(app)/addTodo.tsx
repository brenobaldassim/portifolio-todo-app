import { View, Text } from 'react-native';
import React from 'react';
import TodoForms from './todo-components/forms/TodoForms';
import { createTodoRequest } from './utils/requests/requestsOperations';

const addTodo = () => {
	return (
		<View>
			<TodoForms fetchFunction={createTodoRequest} />
		</View>
	);
};

export default addTodo;
