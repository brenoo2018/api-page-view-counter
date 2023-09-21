import { PageViewCounterRepository } from '../../../domain/repositories/page-view-counter-repository';

export interface InputCreateAndIncrementPageViewCounterDto {
	key: string;
	pageViewCounterRepository: PageViewCounterRepository;
}
