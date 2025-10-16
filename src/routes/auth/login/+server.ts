import { redirect } from '@sveltejs/kit';
import { env } from '$lib/server/env';

const OSU_AUTHORIZE_URL = 'https://osu.ppy.sh/oauth/authorize';

export const GET = ({ url }) => {
	const params = new URLSearchParams({
		client_id: env.OSU_CLIENT_ID,
		redirect_uri: `${url.origin}/auth/callback`,
		response_type: 'code',
		scope: 'identify public'
	});

	throw redirect(302, `${OSU_AUTHORIZE_URL}?${params.toString()}`);
};
