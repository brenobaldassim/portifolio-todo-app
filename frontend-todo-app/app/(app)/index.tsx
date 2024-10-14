import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { router, Stack } from 'expo-router';
import { Search } from './utils/requests/requestsOperations';
import { fetchTodo } from './utils/requests/requestsOperations';
import { FlatList } from 'react-native-gesture-handler';
import CardItem from './todo-components/cards/CardItem';

const Home = () => {
	const [todos, setTodos] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState<Search>({ limit: 10, page: 1, status: '' });

	function handleAddPress() {
		router.push('/addTodo');
	}
	useEffect(() => {
		fetchTodo({ setData: setTodos, setLoading, setError, search });
	}, []);

	if (loading) return <ActivityIndicator style={styles.loadingSpinner} size='large' color='#0000ff' />;
	if (error) return <Text>Error: {error}</Text>;
	if (!todos) return <Text>No todo data available</Text>;
	return (
		<>
			<Stack.Screen options={{ title: 'TodoApp', headerShown: true }} />
			<View style={styles.wrapper}>
				<View style={styles.button}>
					<Button title='Add Todo' onPress={handleAddPress}></Button>
				</View>
				<FlatList
					style={styles.flatList}
					data={todos}
					renderItem={({ item }) => <CardItem todo={item} />}
				></FlatList>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	form: {
		marginTop: 100,
		padding: 20,
		width: '100%',
		minHeight: 600,
	},
	flatList: {
		width: '100%',
		marginTop: 70,
	},
	wrapper: {
		width: '100%',
		padding: 20,
		flex: 1,
	},
	button: {
		width: '30%',
		position: 'absolute',
		right: 20,
		top: 20,
	},
	loadingSpinner: {
		marginTop: 100,
	},
});

export default Home;
