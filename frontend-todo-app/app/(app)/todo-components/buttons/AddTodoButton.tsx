// src/components/AddTodoButton.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { AddTodoXml } from '../../utils/xmls';
import GLOBAL_STYLYING from '../../utils/styles';

const AddTodoButton: React.FC = () => {
	const handleAddPress = () => {
		router.push('/addTodo');
	};

	return (
		<View style={styles.wrapper}>
			<Pressable style={[styles.button, GLOBAL_STYLYING.button_color]} onPress={handleAddPress}>
				<SvgXml xml={AddTodoXml} width='100%' height='100%' />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		alignSelf: 'flex-end',
		padding: 10,
	},
	wrapper: {
		width: '100%',
		marginTop: 20,
	},
});

export default AddTodoButton;
