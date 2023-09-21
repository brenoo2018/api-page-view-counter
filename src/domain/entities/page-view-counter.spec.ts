import { describe, expect, it } from 'vitest';
import { InvalidKeyError } from './errors/invalid-key';
import { InvalidCounterError } from './errors/invalid-counter';
import { createCounter, incrementCounter } from './page-view-counter';

describe('#Page View Suite Entity', () => {
	it('should throw InvalidKeyError if the key is invalid', async () => {
		const mock = 'invalidKeyyjhyuyuuyuyuy';
		expect(() => createCounter(mock)).toThrowError(InvalidKeyError);
	});

	it('should throw InvalidCounterError if the counter is invalid', async () => {
		const mock = -5;
		expect(() => incrementCounter(mock)).toThrowError(InvalidCounterError);
	});

	it('should be a create a counter', async () => {
		const key = 'key';
		const returnDataMock = {
			key,
			count: 0,
		};
		const result = createCounter(key);
		expect(result).toEqual(returnDataMock);
	});

	it('should be a increase a counter', async () => {
		const mock = 0;
		const returnDataMock = mock + 1;
		const result = incrementCounter(mock);
		expect(result).toEqual(returnDataMock);
	});
});
