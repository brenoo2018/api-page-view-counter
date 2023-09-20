import { PageViewCounter } from '../../entities/PageViewCounter.entity';
import { PageViewCounterRepository } from '../../repositories/pageViewCounter.repository';

const pageViewCounters: PageViewCounter[] = [];

const pageViewCounterInMemoryRepository: PageViewCounterRepository = {
	createPageViewCounter: async (key: string) => {
		const counter = {
			key,
			count: 0,
		};
		pageViewCounters.push(counter);
		return counter;
	},
	incrementPageView: async (key: string) => {
		const counter = pageViewCounters.find((item) => item.key === key);

		if (!counter) {
			return null;
		}

		counter.count += 1;

		return counter;
	},
};

export default pageViewCounterInMemoryRepository;
