export class CounterNotFoundError extends Error {
	constructor() {
		super('Page view counter not found.');
	}
}
