export enum Status {
	DONE = 'done',
	IN_PROGRESS = 'in_progress',
}

function isStatusValid(status: string): status is Status {
	return status === Status.IN_PROGRESS || status === Status.DONE;
}

function isTitleValid(title: string): boolean {
	return title.length > 0;
}

export { isTitleValid, isStatusValid };
