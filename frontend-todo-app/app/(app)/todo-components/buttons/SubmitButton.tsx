import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import React from 'react';

interface Props {
	handleSubmit: () => void;
}

const SubmitButton: React.FC<Props> = ({ handleSubmit }) => {
	return (
		<View>
			<Button title='Submit' onPress={handleSubmit}></Button>
		</View>
	);
};

export default SubmitButton;

const styles = StyleSheet.create({});
