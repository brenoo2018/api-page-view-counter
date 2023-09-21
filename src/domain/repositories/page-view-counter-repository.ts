import { PageViewCounter } from '../entities/page-view-counter';

export interface PageViewCounterRepository {
	createPageViewCounter(key: string): Promise<PageViewCounter>;
	incrementPageViewCounter(key: string, count: number): Promise<number>;
	findPageViewCounter(key: string): Promise<PageViewCounter | null>;
}
