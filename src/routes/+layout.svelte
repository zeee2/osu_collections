<script lang="ts">
	import '../app.css';

	import { i18n } from '$lib/i18n';
	import { ModeWatcher } from 'mode-watcher';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Header from '$components/header.svelte';

	let { data, children } = $props();
</script>

<ModeWatcher />

<ParaglideJS {i18n}>
	<Header user={data.user} />

	{@render children()}
</ParaglideJS>
