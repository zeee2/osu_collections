import { OSU_CLIENT_ID, OSU_CLIENT_SECRET, COOKIE_SECRET } from '$env/static/private';
import { z } from 'zod';

const envSchema = z.object({
	OSU_CLIENT_ID: z.string().min(1),
	OSU_CLIENT_SECRET: z.string().min(1),
	COOKIE_SECRET: z.string().min(1)
});

export const env = envSchema.parse({
	OSU_CLIENT_ID,
	OSU_CLIENT_SECRET,
	COOKIE_SECRET
});
