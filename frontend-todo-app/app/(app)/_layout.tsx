import { Text } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { View } from 'react-native';

export default function AppLayout() {
	const { authState } = useAuth();

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!authState?.isAuthenticated) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href='/login' />;
	}

	return (
		<View style={styles.container}>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: '#25292e',
					},
					headerTintColor: '#fff',
					headerShadowVisible: false,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
	},
});
