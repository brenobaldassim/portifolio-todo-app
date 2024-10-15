import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { Stack } from 'expo-router';
import { isDescriptionValid, isStatusValid, isTitleValid } from '../../utils/utils';
import { Status } from '../../utils/utils';
import TodoInputs from './TodoInputs';
import { Todo } from '../../utils/requests/requestsOperations';
import SubmitTodoButton from '../buttons/SubmitTodoButton';

interface Props {
	itemTitle?: string;
	itemDescription?: string;
	itemStatus?: string;
	id?: number;
	fetchFunction: (todo: Todo) => Promise<any>;
}

const TodoForms: React.FC<Props> = ({ itemTitle, itemDescription, itemStatus, id, fetchFunction }) => {
	const [title, setTitle] = useState<string>(itemTitle || '');
	const [description, setDescription] = useState<string>(itemDescription || '');
	const [status, setStatus] = useState<string>(itemStatus || Status.IN_PROGRESS);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

	const validateForm = () => {
		let errors: { [key: string]: string } = {};
		errors['status'] = isStatusValid(status);
		errors['title'] = isTitleValid(title);
		errors['description'] = isDescriptionValid(description);

		setErrors(errors);
		return Object.keys(errors).every((key) => errors[key] === '');
	};

	const handleSubmit = async () => {
		if (!isButtonDisabled && validateForm()) {
			const result = fetchFunction({ id, title, description, status });
			result.then((response) => alert(response.message)).finally(() => router.replace('/'));
		}
	};

	useEffect(() => {
		const isFormValid = validateForm();
		setIsButtonDisabled(!isFormValid);
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
				<SubmitTodoButton disabled={isButtonDisabled} handleSubmit={handleSubmit} />
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
