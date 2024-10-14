export enum Status {
	PENDING = 'pending',
	DONE = 'done',
	IN_PROGRESS = 'in_progress',
}

function isStatusValid(status: string): status is Status {
	return status === Status.IN_PROGRESS || status === Status.DONE || status === Status.PENDING;
}

function isTitleValid(title: string): boolean {
	return title.length > 0;
}

export { isTitleValid, isStatusValid };
