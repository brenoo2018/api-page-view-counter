import { InvalidCounterError } from '../../../domain/entities/errors/invalid-counter';
import { createCounter, incrementCounter } from '../../../domain/entities/page-view-counter';
import { InputCreateAndIncrementPageViewCounterDto } from './create-and-increment.dto';

export async function execute({ key, pageViewCounterRepository }: InputCreateAndIncrementPageViewCounterDto): Promise<number> {
	let updatedCounter = 0;
	const findCounter = await pageViewCounterRepository.findPageViewCounter(key);

	if (!findCounter) {
		const createdCounter = createCounter(key);
		const incrementCount = incrementCounter(createdCounter.count);

		const createPageview = await pageViewCounterRepository.createPageViewCounter(createdCounter.key);

		if (createPageview.count < 0) {
			throw new InvalidCounterError();
		}

		updatedCounter = await pageViewCounterRepository.incrementPageViewCounter(createdCounter.key, incrementCount);
	} else {
		updatedCounter = await pageViewCounterRepository.incrementPageViewCounter(findCounter.key, findCounter.count);
	}

	if (updatedCounter < 0) {
		throw new InvalidCounterError();
	}

	return updatedCounter;
}
