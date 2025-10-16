<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import LocaleSwitcher from '$components/locale-switcher.svelte';
	import type { OsuUser } from '$lib/types/osu';

	export let user: OsuUser | null;
</script>

<header class="flex items-center justify-between p-4">
	<a href="/" class="text-lg font-bold">{m.house_patchy_flamingo_link()}</a>

	<div class="flex items-center gap-4">
		<LocaleSwitcher />

		{#if user}
			<div class="flex items-center gap-2">
				<img src={user.avatar_url} alt={user.username} class="h-8 w-8 rounded-full" />
				<span>{user.username}</span>
				<a href="/auth/logout" class="rounded bg-red-500 px-3 py-1 text-white">Logout</a>
			</div>
		{:else}
			<a href="/auth/login" class="rounded bg-blue-500 px-3 py-1 text-white">Login with osu!</a>
		{/if}
	</div>
</header>
