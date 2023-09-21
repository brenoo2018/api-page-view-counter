export class InvalidKeyError extends Error implements DomainError {
	constructor() {
		super(...arguments);
		this.name = 'InvalidKeyError';
		this.message = 'Invalid key provided. Keys must be alphanumeric and have a maximum length of 10 characters.';
	}
}
