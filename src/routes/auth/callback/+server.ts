
import { error, redirect } from '@sveltejs/kit';
import { env } from '$lib/server/env';
import type { OsuUser } from '$lib/types/osu';
import { createHmac } from 'crypto';

const OSU_TOKEN_URL = 'https://osu.ppy.sh/oauth/token';
const OSU_API_URL = 'https://osu.ppy.sh/api/v2';

export const GET = async ({ url, cookies }) => {
	const code = url.searchParams.get('code');
	if (!code) {
		throw error(400, 'No code provided');
	}

	// Exchange code for access token
	const tokenResponse = await fetch(OSU_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: env.OSU_CLIENT_ID,
			client_secret: env.OSU_CLIENT_SECRET,
			code,
			grant_type: 'authorization_code',
			redirect_uri: `${url.origin}/auth/callback`
		})
	});

	if (!tokenResponse.ok) {
		console.error(await tokenResponse.json());
		throw error(500, 'Failed to fetch token');
	}

	const tokenData = await tokenResponse.json();

	// Fetch user data
	const userResponse = await fetch(`${OSU_API_URL}/me`,
		{
			headers: {
				Authorization: `Bearer ${tokenData.access_token}`
			}
		}
	);

	if (!userResponse.ok) {
		throw error(500, 'Failed to fetch user data');
	}

	const userData: OsuUser = await userResponse.json();


	// Create session
	const sessionData = {
		user: {
			id: userData.id,
			username: userData.username,
			avatar_url: userData.avatar_url,
			country_code: userData.country_code
		},
		accessToken: tokenData.access_token,
		expires_at: Date.now() + tokenData.expires_in * 1000
	};

	const sessionJson = JSON.stringify(sessionData);

	// Create a signature
	const signature = createHmac('sha256', env.COOKIE_SECRET).update(sessionJson).digest('hex');

	const signedSession = `${sessionJson}.${signature}`;

	cookies.set('session', signedSession, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: tokenData.expires_in
	});

	throw redirect(302, '/');
};
