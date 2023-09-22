import { PageViewCounter } from '../../domain/entities/page-view-counter';
import { PageViewCounterRepository } from '../../domain/repositories/page-view-counter-repository';

export async function createPageViewCounter(db: D1Database, key: string): Promise<PageViewCounter> {
	await db.prepare(`INSERT INTO pageviews (key, count) VALUES (?, 1)`).bind(key).run();
	const record = await db.prepare(`SELECT * FROM pageviews WHERE key = ?`).bind(key).first();
	console.log('🚀 ~ file: pageview.ts:7 ~ createPageViewCounter ~ record:', record);

	return mapToPageViewCounter(record);
}

export async function incrementPageViewCounter(db: D1Database, key: string, count: number): Promise<number> {
	await db
		.prepare(`UPDATE pageviews SET count = ? WHERE key = ?`)
		.bind(count + 1, key)
		.run();

	const record = await db.prepare(`SELECT * FROM pageviews WHERE key = ?`).bind(key).first();

	const counter = record && record.count;
	return Number(counter);
}

export async function findPageViewCounter(db: D1Database, key: string): Promise<PageViewCounter | null> {
	const record = await db.prepare(`SELECT * FROM pageviews WHERE key = ?`).bind(key).first();
	if (!record) {
		return null;
	}

	return mapToPageViewCounter(record);
}

function mapToPageViewCounter(dbResult: any): PageViewCounter {
	console.log('🚀 ~ file: pageview.ts:33 ~ mapToPageViewCounter ~ dbResult:', dbResult);
	return {
		key: dbResult.key,
		count: dbResult.count,
	};
}
