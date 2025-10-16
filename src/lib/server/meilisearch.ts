import { MeiliSearch } from 'meilisearch';
import { MEILISEARCH_HOST, MEILI_MASTER_KEY } from '$env/static/server';
import type { User, BeatmapCollection } from './db/schema'; // Assuming these types are exported from schema.ts

export const meilisearch = new MeiliSearch({
	host: MEILISEARCH_HOST,
	apiKey: MEILI_MASTER_KEY,
});

// Define Meilisearch indexes
export const usersIndex = meilisearch.index('users');
export const beatmapCollectionsIndex = meilisearch.index('beatmap_collections');

// Functions to update Meilisearch indexes
export async function indexUser(user: User) {
	await usersIndex.addDocuments([user]);
}

export async function unindexUser(userId: string) {
	await usersIndex.deleteDocument(userId);
}

export async function indexBeatmapCollection(collection: BeatmapCollection) {
	await beatmapCollectionsIndex.addDocuments([collection]);
}

export async function unindexBeatmapCollection(collectionId: string) {
	await beatmapCollectionsIndex.deleteDocument(collectionId);
}
