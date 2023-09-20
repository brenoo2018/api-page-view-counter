import { PageViewCounter } from '../entities/PageViewCounter.entity';
import { InvalidKeyError } from '../errors/InvalidKey.error';

// Function to create a new page view counter
export function createPageViewCounter(key: string): PageViewCounter {
	return {
		key,
		count: 0,
	};
}

// Function to increment the page views counter
export function incrementPageView(counter: PageViewCounter): PageViewCounter {
	return {
		...counter,
		count: counter.count + 1,
	};
}

// Use case function to create a page views counter and increment it
export function incrementPageViewCount(key: string): PageViewCounter {
	if (!isValidKey(key)) {
		throw new InvalidKeyError();
	}

	const counter = createPageViewCounter(key);
	const updatedCounter = incrementPageView(counter);
	return updatedCounter;
}

// Key validation function
function isValidKey(key: string): boolean {
	const alphanumericRegex = /^[a-zA-Z0-9]+$/;
	return key.length <= 10 && alphanumericRegex.test(key);
}
