import { describe, expect, it } from 'vitest';
import { PageViewCounterRepository } from '../repositories/page-view-counter-repository';
import InMemoryPageViewCounterRepository from '../repositories/in-memory/in-memory-page-view-counter-repository';
import * as PageViewCounterUseCase from '../useCases/page-view-counter-use-case';
import { InvalidKeyError } from '../errors/invalid-key-error';
import { CounterNotFoundError } from '../errors/counter-not-found-error';

describe('Page View Counter Use Case', () => {
	it('should create a new page view counter and increment it', async () => {
		const pageViewCounterRepository: PageViewCounterRepository = InMemoryPageViewCounterRepository;

		const key = 'key';

		const result = await PageViewCounterUseCase.execute({
			key,
			pageViewCounterRepository,
		});

		expect(result.key).toEqual(key);
		expect(result.count).toEqual(1);
	});

	it('should throw InvalidKeyError for an invalid key', async () => {
		const pageViewCounterRepository: PageViewCounterRepository = InMemoryPageViewCounterRepository;

		const invalidKey = 'invalidKeyy';

		await expect(() =>
			PageViewCounterUseCase.execute({
				key: invalidKey,
				pageViewCounterRepository,
			})
		).rejects.toBeInstanceOf(InvalidKeyError);
	});

	it('should throw CounterNotFoundError if incrementPageView returns null', async () => {
		// Mock PageViewCounterRepository to return null
		const pageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => ({
				key,
				count: 0,
			}),
			incrementPageView: async (key: string) => null,
		};

		const key = 'key';

		await expect(() =>
			PageViewCounterUseCase.execute({
				key,
				pageViewCounterRepository,
			})
		).rejects.toBeInstanceOf(CounterNotFoundError);
	});
});
