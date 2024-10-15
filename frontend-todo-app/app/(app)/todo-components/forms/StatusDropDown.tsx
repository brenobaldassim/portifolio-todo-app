import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Status, StatusSearch } from '../../utils/utils';
import { formatStatustext } from '../../utils/utils'; // Ensure correct import paths
import GLOBAL_STYLYING from '../../utils/styles'; // Ensure correct import paths

interface StatusDropdownProps {
	status: string;
	setStatus: Function;
	values: typeof StatusSearch | typeof Status;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ status, setStatus, values }) => {
	return (
		<SelectDropdown
			defaultValue={status}
			data={Object.values(values)}
			onSelect={(item) => setStatus(item)}
			renderButton={(selectedItem) => {
				return (
					<View style={[styles.dropdown, GLOBAL_STYLYING.button_color]}>
						{selectedItem ? (
							<Text style={[styles.textDropdown, GLOBAL_STYLYING.text_color_white]}>
								{formatStatustext(selectedItem) || StatusSearch.ALL}
							</Text>
						) : (
							<Text style={[styles.textDropdown, GLOBAL_STYLYING.text_color_white]}>
								{formatStatustext(status) || StatusSearch.ALL}
							</Text>
						)}
					</View>
				);
			}}
			renderItem={(item) => {
				return (
					<View style={[styles.dropdownOptions, GLOBAL_STYLYING.button_color]}>
						<Text style={[styles.textDropdown, GLOBAL_STYLYING.text_color_white]}>
							{formatStatustext(item) || StatusSearch.ALL}
						</Text>
					</View>
				);
			}}
		/>
	);
};

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
	textDropdown: {
		textAlign: 'center',
	},
});

export default StatusDropdown;
