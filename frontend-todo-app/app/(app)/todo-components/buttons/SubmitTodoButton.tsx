import { StyleSheet } from 'react-native';
import { View, Pressable, Text } from 'react-native';
import { SubmitTodoXml } from '../../utils/xmls';
import { SvgXml } from 'react-native-svg';
import React from 'react';
import GLOBAL_STYLYING from '../../utils/styles';

interface Props {
	handleSubmit: () => void;
	disabled: boolean;
}

const SubmitTodoButton: React.FC<Props> = ({ handleSubmit, disabled }) => {
	return (
		<View style={styles.wrapper}>
			<Pressable disabled={disabled} style={[styles.button, GLOBAL_STYLYING.button_color]} onPress={handleSubmit}>
				<SvgXml xml={SubmitTodoXml} width='100%' height='100%' />
			</Pressable>
		</View>
	);
};

export default SubmitTodoButton;

const styles = StyleSheet.create({
	button: {
		width: 70,
		height: 70,
		borderRadius: 100,
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
