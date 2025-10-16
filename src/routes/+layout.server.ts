import type { OsuUser } from '$lib/types/osu';
import { createHmac } from 'crypto';
import { env } from '$lib/server/env';

export const load = ({ cookies }) => {
	const signedSession = cookies.get('session');

	if (!signedSession) {
		return { user: null };
	}

	try {
		const [sessionJson, signature] = signedSession.split('.');

		if (!sessionJson || !signature) {
			return { user: null };
		}

		// Verify the signature
		const expectedSignature = createHmac('sha256', env.COOKIE_SECRET)
			.update(sessionJson)
			.digest('hex');

		if (signature !== expectedSignature) {
			console.warn('Invalid session signature');
			cookies.delete('session', { path: '/' }); // Delete tampered cookie
			return { user: null };
		}

		const sessionData = JSON.parse(sessionJson);
		return { user: sessionData.user as OsuUser };
	} catch (e) {
		return { user: null };
	}
};
