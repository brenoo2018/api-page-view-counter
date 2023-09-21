import { isValidCounter } from './count';
import { InvalidCounterError } from './errors/invalid-counter';
import { InvalidKeyError } from './errors/invalid-key';
import { isValidKey } from './key';

export interface PageViewCounter {
	key: string;
	count: number;
}

export function createCounter(key: string): PageViewCounter {
	if (!isValidKey(key)) {
		throw new InvalidKeyError();
	}

	return {
		key,
		count: 0,
	};
}
export function incrementCounter(counter: number): number {
	if (!isValidCounter(counter)) {
		throw new InvalidCounterError();
	}
	return counter + 1;
}
