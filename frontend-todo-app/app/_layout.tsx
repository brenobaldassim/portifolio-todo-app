import { AuthProvider } from '@/app/context/AuthContext';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Root() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<AuthProvider style={styles.container}>
				<Slot />
			</AuthProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#25292e',
	},
});
