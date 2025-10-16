<script lang="ts">
	import type { OsuUser } from '$lib/types/osu';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	export let user: OsuUser;

	let showPopup = false;

	const dispatch = createEventDispatcher();

	function togglePopup() {
		showPopup = !showPopup;
	}

	function handleLogout() {
		// In a real application, this would trigger a logout action
		// For now, we'll just dispatch an event or navigate
		window.location.href = '/auth/logout';
	}

	// Close popup when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (showPopup && event.target && !(event.target as HTMLElement).closest('.user-menu-container')) {
			showPopup = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="relative user-menu-container">
	<button class="group flex items-center gap-3 rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700" on:click={togglePopup}>
		<img src={user.avatar_url} alt={user.username} class="h-9 w-9 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 group-hover:ring-blue-500" />
		<span class="hidden font-medium text-gray-800 transition-colors duration-200 group-hover:text-blue-600 sm:inline dark:text-gray-200 dark:group-hover:text-blue-400">{user.username}</span>
	</button>

	{#if showPopup}
		<div
			class="absolute right-0 top-full mt-3 w-80 origin-top-right transform rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-2xl ring-1 ring-gray-200 transition-all duration-300 ease-out dark:from-gray-800 dark:to-gray-900 dark:ring-gray-700"
			in:fly={{ y: -10, x: 10, duration: 200 }}
			out:fly={{ y: -10, x: 10, duration: 200 }}
		>
			<div
				class="relative -mx-6 -mt-6 mb-4 h-32 rounded-t-xl bg-cover bg-center"
				style={`background-image: url(${user.cover_url});`}
			>
				<div class="absolute inset-0 rounded-t-xl bg-black/30"></div>
			</div>
			<div class="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700 relative z-10">
				<img src={user.avatar_url} alt={user.username} class="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" />
				<span class="text-lg font-bold text-gray-900 dark:text-white">{user.username}</span>
			</div>
			<a
				href="/auth/logout"
				class="block w-full rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-4 py-2.5 text-center text-base font-semibold text-white shadow-md transition-all duration-200 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-800"
				on:click|preventDefault={handleLogout}
				>Logout</a
			>
		</div>
	{/if}
</div>
