export class ToDoAppErrors extends Error {
	public statusCode: number;
	public override message: string;

	constructor(statusCode: number, message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.statusCode = statusCode;
		this.message = message;
		Error.captureStackTrace(this);
	}
}
