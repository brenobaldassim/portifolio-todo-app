import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Todo } from '../../utils/requests/requestsOperations';
import CardItem from './CardItem';

interface Props {
	todos: Todo[];
}

const CardWrapper: React.FC<Props> = ({ todos }) => {
	return (
		<>
			{todos.map((todo: any) => (
				<CardItem key={todo.id} todo={todo} />
			))}
		</>
	);
};

export default CardWrapper;

const styles = StyleSheet.create({});
