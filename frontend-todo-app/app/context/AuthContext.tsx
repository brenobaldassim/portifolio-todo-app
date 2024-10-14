import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
	authState?: { token: string | null; isAuthenticated: boolean | null };
	onRegister: (username: string, password: string) => Promise<any>;
	onLogin?: (username: string, password: string) => Promise<any>;
	onLogout: () => Promise<any>;
}

const TOKEN_KEY = 'token';
const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
	const [authState, setAuthState] = useState<{ token: string | null; isAuthenticated: boolean | null }>({
		token: null,
		isAuthenticated: null,
	});

	useEffect(() => {
		const loadToken = async () => {
			let token = '';
			if (Platform.OS === 'web') {
				token = localStorage.getItem(TOKEN_KEY) ?? '';
			} else token = (await SecureStore.getItemAsync(TOKEN_KEY)) ?? '';
			if (token.length === 0) return;
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			setAuthState({ token, isAuthenticated: true });
		};
		loadToken();
	}, []);

	const register = async (username: string, password: string) => {
		try {
			return await axios.post(`${API_URL}/users/register`, { username, password });
		} catch (error) {
			return { error: true, msg: (error as any).response.data.error };
		}
	};

	const login = async (username: string, password: string) => {
		try {
			const { data } = await axios.post(`${API_URL}/users/login`, { username, password });
			const token = data.data.token;
			// Set auth state for later
			setAuthState({ token: token, isAuthenticated: true });
			// Set header for auth request on the todos
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			//Set the stored token in secure storage
			if (Platform.OS === 'web') {
				localStorage.setItem(TOKEN_KEY, token);
			} else await SecureStore.setItemAsync(TOKEN_KEY, token);

			return { error: false };
		} catch (error) {
			return { error: true, msg: (error as any).response.data.error };
		}
	};

	const logout = async () => {
		//Delete the token from secure storage
		if (Platform.OS === 'web') {
			localStorage.removeItem(TOKEN_KEY);
		} else await SecureStore.deleteItemAsync(TOKEN_KEY);
		//Reset header so request are going to be invalid
		axios.defaults.headers.common['Authorization'] = '';
		//Reset auth state
		setAuthState({ token: null, isAuthenticated: false });
	};
	const value = {
		onRegister: register,
		onLogin: login,
		onLogout: logout,
		authState,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
