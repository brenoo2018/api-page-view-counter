import { Env } from '../..';
import { execute } from '../../app/usecases/pageview/create-and-increment';
import { PageViewCounterRepository } from '../../domain/repositories/page-view-counter-repository';
import { createPageViewCounter, findPageViewCounter, incrementPageViewCounter } from '../repositories/pageview';

export async function pageViewCounter(request: Request, env: Env, ctx: ExecutionContext, key: string) {
	try {
		const pageViewCounterRepository: PageViewCounterRepository = {
			createPageViewCounter: async (key: string) => createPageViewCounter(env.DB, key),
			incrementPageViewCounter: async (key: string, count: number) => incrementPageViewCounter(env.DB, key, count),
			findPageViewCounter: async (key: string) => findPageViewCounter(env.DB, key),
		};

		const count = await execute({ key, pageViewCounterRepository });

		return count;
	} catch (error) {
		return error;
	}
}
