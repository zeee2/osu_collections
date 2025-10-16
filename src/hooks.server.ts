import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createHmac } from 'crypto';

import { i18n } from '$lib/i18n';
import { env } from '$lib/server/env';

const handleParaglide: Handle = i18n.handle();

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('session');

	if (sessionCookie) {
		const [sessionJson, signature] = sessionCookie.split('.');
		const expectedSignature = createHmac('sha256', env.COOKIE_SECRET)
			.update(sessionJson)
			.digest('hex');

		if (signature === expectedSignature) {
			const session = JSON.parse(sessionJson);

			if (session.expires_at > Date.now()) {
				event.locals.user = session.user;
			} else {
				event.cookies.delete('session', { path: '/' });
			}
		} else {
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleParaglide);
