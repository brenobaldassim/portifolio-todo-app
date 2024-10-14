import { View, Text, Button } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';

const Login = () => {
	const { onLogin, onRegister } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		const result = await onLogin!(username, password);
		if (result && result.error) {
			alert(result.msg);
		} else router.replace('/');
	};

	const register = async () => {
		const result = await onRegister!(username, password);
		if (result && result.error) {
			alert(result.msg);
		} else login();
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput
					style={styles.textInput}
					placeholder='Username'
					onChangeText={(text) => setUsername(text)}
					value={username}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Password'
					secureTextEntry={true}
					onChangeText={(text) => setPassword(text)}
					value={password}
				/>
				<Button color={'black'} onPress={login} title='Login' />
				<Button color={'black'} onPress={register} title='Register' />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		alignItems: 'center',
	},
	textInput: {
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff',
	},
	form: {
		gap: 10,
		width: '60%',
	},
});

export default Login;
