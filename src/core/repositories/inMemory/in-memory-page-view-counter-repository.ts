import { PageViewCounterEntity } from '../../entities/page-view-counter-entity';
import { PageViewCounterRepository } from '../../repositories/page-view-counter-repository';

const pageViewCounters: PageViewCounterEntity[] = [];

const InMemoryPageViewCounterRepository: PageViewCounterRepository = {
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

export default InMemoryPageViewCounterRepository;
