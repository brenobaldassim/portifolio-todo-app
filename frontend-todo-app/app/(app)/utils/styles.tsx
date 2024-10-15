import { StyleSheet } from 'react-native';

export const PLACEHOLDER_COLOR = '#6c757d';
export const ERROR_COLOR = '#ff5e5b';
export const SUCCESS_COLOR = 'green';
export const BUTTON_COLOR = '#084b83';

const GLOBAL_STYLYING = StyleSheet.create({
	bg_color: {
		backgroundColor: '#25292e',
	},
	button_color: {
		backgroundColor: BUTTON_COLOR,
	},
	delete_button_color: {
		borderColor: ERROR_COLOR,
		borderWidth: 1,
	},
	text_color_white: {
		color: 'white',
	},
});

export default GLOBAL_STYLYING;
