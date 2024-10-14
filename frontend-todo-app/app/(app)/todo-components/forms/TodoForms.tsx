import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Stack } from 'expo-router';
import SubmitButton from '../buttons/SubmitButton';
import { isStatusValid, isTitleValid } from '../../utils/utils';
import { Status } from '../../utils/utils';
import TodoInputs from './TodoInputs';
import { Todo } from '../../utils/requests/requestsOperations';

interface Props {
	itemTitle?: string;
	itemDescription?: string;
	itemStatus?: string;
	id?: number;
	fetchFunction: (todo: Todo) => void;
}

const TodoForms: React.FC<Props> = ({ itemTitle, itemDescription, itemStatus, id, fetchFunction }) => {
	const [title, setTitle] = useState<string>(itemTitle || '');
	const [description, setDescription] = useState<string>(itemDescription || '');
	const [status, setStatus] = useState<string>(itemStatus || Status.PENDING);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const validateForm = () => {
		let errors: { [key: string]: string } = {};
		if (!isStatusValid(status)) errors['status'] = 'Status not valid';
		if (!isTitleValid(title)) errors['title'] = 'Title not valid';

		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			fetchFunction({ id, title, description, status });
		}
	};

	useEffect(() => {
		console.log('onform', { title, description, status });
	}, [title, description, status]);
	return (
		<View style={styles.container}>
			<>
				<Stack.Screen options={{ title: title, headerShown: true }} />
				<TodoInputs
					title={title}
					description={description}
					status={status}
					errors={errors}
					setTitle={setTitle}
					setDescription={setDescription}
					setStatus={setStatus}
				/>
				<SubmitButton handleSubmit={handleSubmit} />
			</>
		</View>
	);
};

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

export default TodoForms;
