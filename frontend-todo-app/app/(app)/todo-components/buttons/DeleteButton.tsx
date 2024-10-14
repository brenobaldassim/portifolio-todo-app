import { Button, StyleSheet, View } from 'react-native';
import { deleteTodoRequest } from '../../utils/requests/requestsOperations';
import React from 'react';

interface Props {
	id: number;
}

const DeleteButton: React.FC<Props> = ({ id }) => {
	const handleDelete = async () => {
		deleteTodoRequest(id);
	};
	return (
		<View style={styles.deleteButtonWrapper}>
			<View style={styles.deleteButton}>
				<Button title='Delete' color={'red'} onPress={handleDelete}></Button>
			</View>
		</View>
	);
};

export default DeleteButton;

const styles = StyleSheet.create({
	deleteButtonWrapper: {
		width: '100%',
		marginTop: 12,
		marginBottom: 2,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	deleteButton: {
		width: '25%',
	},
});
