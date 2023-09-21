export class InvalidKeyError extends Error {
	constructor() {
		super('The key must be alphanumeric with a maximum of 10 characters.');
	}
}
