import { redirect } from '@sveltejs/kit';

export const GET = ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	throw redirect(302, '/');
};
