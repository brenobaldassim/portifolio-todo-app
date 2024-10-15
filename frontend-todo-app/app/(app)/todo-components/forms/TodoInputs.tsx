import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import { Status } from '../../utils/utils';
import GLOBAL_STYLYING, { PLACEHOLDER_COLOR, ERROR_COLOR } from '../../utils/styles';
import { formatStatustext } from '../../utils/utils';
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
		<View style={styles.container}>
			<View style={styles.dropdownContainer}>
				<SelectDropdown
					defaultValue={status}
					data={Object.values(Status)}
					onSelect={(item) => setStatus(item)}
					renderButton={(selectedItem) => {
						return (
							<View style={[styles.dropdown, GLOBAL_STYLYING.button_color]}>
								{selectedItem ? (
									<Text style={[styles.textDropdown, GLOBAL_STYLYING.text_color_white]}>
										{formatStatustext(selectedItem)}
									</Text>
								) : (
									<Text>{formatStatustext(status)}</Text>
								)}
							</View>
						);
					}}
					renderItem={(item) => {
						return (
							<View style={[styles.dropdownOptions, GLOBAL_STYLYING.button_color]}>
								<Text style={[styles.textDropdown, GLOBAL_STYLYING.text_color_white]}>
									{formatStatustext(item)}
								</Text>
							</View>
						);
					}}
				/>
			</View>
			{errors.status && <Text style={styles.error}>{errors.status}</Text>}
			<TextInput
				placeholder='Todo Title Empty'
				placeholderTextColor={PLACEHOLDER_COLOR}
				style={[styles.title, GLOBAL_STYLYING.text_color_white]}
				secureTextEntry={false}
				onChangeText={(text) => setTitle(text)}
				value={title}
			/>
			{errors.title && <Text style={styles.error}>{errors.title}</Text>}
			<TextInput
				placeholder='Todo Description'
				placeholderTextColor={PLACEHOLDER_COLOR}
				style={[styles.description, GLOBAL_STYLYING.text_color_white]}
				secureTextEntry={false}
				multiline={true}
				numberOfLines={10}
				maxLength={300}
				onChangeText={(text) => setDescription(text)}
				value={description}
			/>
			{errors.description && <Text style={styles.error}>{errors.description}</Text>}
		</View>
	);
};

export default TodoInputs;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 28,
		marginTop: 12,
		marginBottom: 4,
		padding: 10,
		fontWeight: 'bold',
	},
	description: {
		minHeight: 150,
		padding: 10,
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
		marginBottom: 12,
	},
	delete: {
		marginTop: 10,
	},
	dropdown: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 8,
		alignSelf: 'flex-start',
		minWidth: 100,
	},
	dropdownOptions: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	dropdownContainer: {
		marginBottom: 20,
		paddingLeft: 10,
	},
	error: {
		color: ERROR_COLOR,
		paddingLeft: 10,
		paddingVertical: 2,
	},
	textDropdown: {
		textAlign: 'center',
	},
});
