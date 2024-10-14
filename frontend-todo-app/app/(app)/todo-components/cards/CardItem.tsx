import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Todo } from '../../utils/requests/requestsOperations';
import React from 'react';

interface Props {
	todo: Todo;
}

const CardItem: React.FC<Props> = ({ todo }) => {
	return (
		<Link key={todo.id} href={`/todos/${todo.id}`} style={styles.link}>
			<View style={styles.card}>
				<View style={styles.cardHead}>
					<Text style={styles.title}>{todo.title}</Text>
					<Text>{todo.status}</Text>
				</View>
			</View>
		</Link>
	);
};

export default CardItem;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		minHeight: 100,
		width: '100%',
		justifyContent: 'center',
		marginTop: 8,
		borderRadius: 8,
		padding: 12,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	cardHead: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	description: {
		minHeight: 40,
		marginTop: 10,
	},
	link: {
		width: '100%',
	},
	status: {},
});
