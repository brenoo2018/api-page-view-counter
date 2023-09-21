import { describe, expect, it } from 'vitest';
import { PageViewCounterRepository } from '../../../domain/repositories/page-view-counter-repository';
import { execute } from './create-and-increment';
import { InvalidCounterError } from '../../../domain/entities/errors/invalid-counter';

describe('#Page View Suite UseCase', () => {
	it('should not be able createPageViewCounter', async () => {
		const mockPageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => ({
				key,
				count: -5,
			}),
			incrementPageViewCounter: async (key: string, count: number) => -5,
			findPageViewCounter: async (key: string) => null,
		};

		const key = 'test';

		await expect(() =>
			execute({
				key,
				pageViewCounterRepository: mockPageViewCounterRepository,
			})
		).rejects.toBeInstanceOf(InvalidCounterError);
	});

	it('should not be able incrementPageViewCounter', async () => {
		const mockPageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => ({
				key,
				count: 1,
			}),
			incrementPageViewCounter: async (key: string, count: number) => -5,
			findPageViewCounter: async (key: string) => ({
				key,
				count: 0,
			}),
		};

		const key = 'test';

		await expect(() =>
			execute({
				key,
				pageViewCounterRepository: mockPageViewCounterRepository,
			})
		).rejects.toBeInstanceOf(InvalidCounterError);
	});

	it('should be able create and increment counter', async () => {
		const mockPageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => ({
				key,
				count: 0,
			}),
			incrementPageViewCounter: async (key: string, count: number) => 1,
			findPageViewCounter: async (key: string) => null,
		};

		const key = 'test';

		const result = await execute({ key, pageViewCounterRepository: mockPageViewCounterRepository });

		expect(result).toEqual(1);
	});

	it('should be able increment counter', async () => {
		const mockPageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => ({
				key,
				count: 0,
			}),
			incrementPageViewCounter: async (key: string, count: number) => 1,
			findPageViewCounter: async (key: string) => ({
				key,
				count: 0,
			}),
		};

		const key = 'test';

		const result = await execute({ key, pageViewCounterRepository: mockPageViewCounterRepository });

		expect(result).toEqual(1);
	});
});
