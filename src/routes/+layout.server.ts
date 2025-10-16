import type { OsuUser } from '$lib/types/osu';

export const load = ({ cookies }) => {
	const session = cookies.get('session');

	if (!session) {
		return { user: null };
	}

	try {
		const sessionData = JSON.parse(session);
		return { user: sessionData.user as OsuUser };
	} catch (e) {
		return { user: null };
	}
};
