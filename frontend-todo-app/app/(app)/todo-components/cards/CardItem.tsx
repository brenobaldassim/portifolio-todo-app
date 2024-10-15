import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import { Todo, updateTodoRequest } from '../../utils/requests/requestsOperations';
import { Status } from '../../utils/utils';
import React, { useEffect } from 'react';

interface Props {
	todo: Todo;
}

const CardItem: React.FC<Props> = ({ todo }) => {
	const [isSelected, setIsSelected] = React.useState(false);

	function handleCheckboxChange() {
		setIsSelected(!isSelected);
		const newStatus = isSelected ? Status.IN_PROGRESS : Status.DONE;
		const result = updateTodoRequest({
			id: todo.id,
			status: newStatus,
			description: todo.description,
			title: todo.title,
		});
		result.then((response) => alert(response.message));
	}

	useEffect(() => {
		setIsSelected(todo.status === Status.DONE);
	}, []);
	return (
		<View style={isSelected ? [styles.card, styles.cardSelected] : [styles.card, styles.cardNotSelected]}>
			<View style={styles.cardHead}>
				<Checkbox
					style={styles.checkbox}
					color={isSelected ? 'black' : undefined}
					value={isSelected}
					onValueChange={handleCheckboxChange}
				/>
				<Link key={todo.id} href={`/todos/${todo.id}`} style={styles.link}>
					<Text style={styles.title}>{todo.title}</Text>
				</Link>
			</View>
		</View>
	);
};

export default CardItem;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		borderColor: '#CCC',
		marginBottom: 10,
		borderWidth: 1,
		marginTop: 8,
		borderRadius: 8,
		padding: 15,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	cardHead: {
		flex: 1,
		gap: 8,
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	cardSelected: {
		backgroundColor: '#c9c9c9',
	},
	cardNotSelected: {
		backgroundColor: '#fff',
	},
	description: {
		minHeight: 40,
		marginTop: 10,
	},
	link: {
		width: '100%',
	},
	checkbox: {
		borderWidth: 1,
		borderColor: '#CCC',
		borderRadius: 20,
	},
});
