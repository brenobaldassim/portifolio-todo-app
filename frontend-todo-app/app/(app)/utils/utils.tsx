export enum Status {
	DONE = 'done',
	IN_PROGRESS = 'in_progress',
}

export enum StatusSearch {
	ALL = '',
	DONE = 'done',
	IN_PROGRESS = 'in_progress',
}

export const StatusMap = {
	All: '',
	Done: 'done',
	'In Progress': 'in_progress',
};

function isStatusValid(status: string): string {
	if (status.length === 0) return 'Status not valid, must not be empty';
	else if (status !== Status.IN_PROGRESS && status !== Status.DONE) return 'Status not valid option';
	return '';
}

function isTitleValid(title: string): string {
	if (title.length === 0) return 'Title not valid, must not be empty';
	else if (title.length > 20) return 'Title not valid, must not be longer than 20 characters';
	else return '';
}

function isDescriptionValid(description: string): string {
	if (description.length === 0) return '';
	else if (description.length > 100) return 'Description not valid, must not be longer than 100 characters';
	return '';
}

function formatStatustext(status: string): string {
	Object.entries(StatusMap).forEach(([key, value]) => {
		if (status === value) status = key;
	});

	return status;
}

export { isTitleValid, isStatusValid, formatStatustext, isDescriptionValid };
