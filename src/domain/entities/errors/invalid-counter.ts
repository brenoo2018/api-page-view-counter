export class InvalidCounterError extends Error implements DomainError {
	constructor() {
		super(...arguments);
		this.name = 'InvalidCounterError';
		this.message = 'Invalid counter provided. Make sure to provide a valid counter to increment.';
	}
}
