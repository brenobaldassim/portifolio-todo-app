// src/components/AddTodoButton.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { AddTodoXml } from '../../utils/xmls';

const AddTodoButton: React.FC = () => {
	const handleAddPress = () => {
		router.push('/addTodo');
	};

	return (
		<View style={styles.wrapper}>
			<Pressable style={styles.button} onPress={handleAddPress}>
				<SvgXml xml={AddTodoXml} width='100%' height='100%' />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
		backgroundColor: 'blue',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		alignSelf: 'flex-end',
		padding: 10,
	},
	wrapper: {
		width: '100%',
		marginTop: 20,
		marginBottom: 20,
	},
});

export default AddTodoButton;
