import { PageViewCounter } from '../entities/PageViewCounter.entity';
import { InvalidKeyError } from '../errors/invalid-key-error';
import { CounterNotFoundError } from '../errors/counter-not-found-error';
import { PageViewCounterRepository } from '../repositories/page-view-counter-repository';

interface PageViewCounterRequest {
	key: string;
	pageViewCounterRepository: PageViewCounterRepository;
}

export async function execute({ key, pageViewCounterRepository }: PageViewCounterRequest): Promise<PageViewCounter> {
	if (!isValidKey(key)) {
		throw new InvalidKeyError();
	}

	await pageViewCounterRepository.createPageViewCounter(key);
	const updatedCounter = await pageViewCounterRepository.incrementPageView(key);
	if (!updatedCounter) {
		throw new CounterNotFoundError();
	}
	return updatedCounter;
}

// Key validation function
function isValidKey(key: string): boolean {
	const alphanumericRegex = /^[a-zA-Z0-9]+$/;
	return key.length <= 10 && alphanumericRegex.test(key);
}
