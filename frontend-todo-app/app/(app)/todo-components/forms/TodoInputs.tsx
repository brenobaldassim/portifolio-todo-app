import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import { Status } from '../../utils/utils';
import React from 'react';

interface Props {
	setTitle: Function;
	setDescription: Function;
	setStatus: Function;
	errors: { [key: string]: string };
	title: string;
	description: string;
	status: string;
}

const TodoInputs: React.FC<Props> = ({ title, description, status, errors, setTitle, setDescription, setStatus }) => {
	return (
		<View>
			<TextInput
				placeholder='Todo Title'
				placeholderTextColor={'blue'}
				style={styles.title}
				secureTextEntry={false}
				onChangeText={(text) => setTitle(text)}
				value={title}
			/>
			{errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}
			<SelectDropdown
				data={Object.values(Status)}
				onSelect={(item) => setStatus(item)}
				renderButton={(selectedItem) => {
					return <View>{selectedItem ? <Text>{selectedItem}</Text> : <Text>{status}</Text>}</View>;
				}}
				renderItem={(item) => {
					return <Text>{item}</Text>;
				}}
			/>
			{errors.status && <Text style={{ color: 'red' }}>{errors.status}</Text>}
			<TextInput
				placeholder='Todo Description'
				placeholderTextColor={'blue'}
				style={styles.description}
				secureTextEntry={false}
				multiline={true}
				numberOfLines={10}
				maxLength={300}
				onChangeText={(text) => setDescription(text)}
				value={description}
			/>
		</View>
	);
};

export default TodoInputs;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	description: {
		minHeight: 150,
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
		marginBottom: 12,
	},
	delete: {
		marginTop: 12,
	},
});
