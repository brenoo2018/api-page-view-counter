import { PageViewCounter } from '../entities/PageViewCounter.entity';

export interface PageViewCounterRepository {
	createPageViewCounter(key: string): Promise<PageViewCounter>;
	incrementPageView(key: string): Promise<PageViewCounter | null>;
}
