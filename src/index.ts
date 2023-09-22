import { pageViewCounter } from './infra/presenters/pageview';
import process from 'node:process';
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const start = process.hrtime();

		const url = new URL(request.url);

		const key = url.pathname.split('/').pop();

		if (!key) {
			return new Response('Not Found', { status: 404 });
		}

		if (url.pathname.startsWith('/pageview/')) {
			const returnPageViewCounter = await pageViewCounter(request, env, ctx, key);
			console.log('🚀 ~ file: index.ts:26 ~ fetch ~ returnPageViewCounter:', returnPageViewCounter);

			const response = new Response(`${returnPageViewCounter}`, { status: 200 });

			const diff = process.hrtime(start);

			const milliseconds = diff[0] * 1000 + diff[1] / 1e6;

			response.headers.set('Content-Type', 'text/plain');
			response.headers.set('X-Runtime', `${milliseconds}`);

			return response;
		} else {
			return new Response('Not Found', { status: 404 });
		}
	},
};
