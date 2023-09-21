import { PageViewCounterEntity } from '../entities/page-view-counter-entity';

export interface PageViewCounterRepository {
	createPageViewCounter(key: string): Promise<PageViewCounterEntity>;
	incrementPageView(key: string): Promise<PageViewCounterEntity | null>;
}
