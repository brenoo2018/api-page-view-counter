import { Env } from '../..';

export async function pageViewCounter(request: Request, env: Env, ctx: ExecutionContext) {
	const url = new URL(request.url);
	const key = url.pathname.split('/').pop();

	return new Response('ok');
}
