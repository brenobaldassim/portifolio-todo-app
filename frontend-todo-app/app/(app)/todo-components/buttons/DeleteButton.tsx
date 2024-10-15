import { Pressable, StyleSheet, View } from 'react-native';
import { deleteTodoRequest } from '../../utils/requests/requestsOperations';
import { router } from 'expo-router';
import React from 'react';
import { DeleteTodoXml } from '../../utils/xmls';
import { SvgXml } from 'react-native-svg';
import GLOBAL_STYLYING from '../../utils/styles';
import { ERROR_COLOR } from '../../utils/styles';

interface Props {
	id: number;
}

const DeleteButton: React.FC<Props> = ({ id }) => {
	const handleDelete = async () => {
		const result = deleteTodoRequest(id);
		result.then((response) => alert(response.message)).finally(() => router.replace('/'));
	};
	return (
		<View style={styles.deleteButtonWrapper}>
			<Pressable style={[styles.deleteButton, GLOBAL_STYLYING.delete_button_color]} onPress={handleDelete}>
				<SvgXml xml={DeleteTodoXml} width='100%' height='100%' fill={ERROR_COLOR} />
			</Pressable>
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
		width: 50,
		height: 50,
		borderRadius: 50,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end',
		padding: 10,
	},
});
