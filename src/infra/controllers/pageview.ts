import { Env } from '../..';
import { execute } from '../../app/usecases/pageview/create-and-increment';
import { PageViewCounterRepository } from '../../domain/repositories/page-view-counter-repository';
import { createPageViewCounter, findPageViewCounter, incrementPageViewCounter } from '../database/pageview';

export async function pageViewCounter(request: Request, env: Env, ctx: ExecutionContext) {
	//inicio

	const url = new URL(request.url);
	const key = url.pathname.split('/').pop();

	if (!key) {
		return new Response('Invalid key', { status: 400 });
	}

	const pageViewCounterRepository: PageViewCounterRepository = {
		createPageViewCounter: async (key: string) => createPageViewCounter(env.DB, key),
		incrementPageViewCounter: async (key: string, count: number) => incrementPageViewCounter(env.DB, key, count),
		findPageViewCounter: async (key: string) => findPageViewCounter(env.DB, key),
	};

	const count = await execute({ key, pageViewCounterRepository });

	//fim

	return new Response(`${count}`, { status: 200 });
}
