<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import LocaleSwitcher from '$components/locale-switcher.svelte';
	import UserMenu from '$components/user-menu.svelte';
	import type { OsuUser } from '$lib/types/osu';

	export let user: OsuUser | null;
</script>

<header class="sticky top-0 z-50 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md dark:bg-gray-900/80 sm:px-6">
	<a href="/" class="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
		{m.house_patchy_flamingo_link()}
	</a>

	<div class="flex items-center gap-4">
		<LocaleSwitcher />

		{#if user}
			<UserMenu {user} />
		{:else}
			<a
				href="/auth/login"
				class="rounded-lg bg-blue-600 px-4 py-1.5 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
				>Login with osu!</a
			>
		{/if}
	</div>
</header>
