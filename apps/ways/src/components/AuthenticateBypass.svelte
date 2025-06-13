<script lang="ts">
	import { type Snippet } from 'svelte';
	import { onMount } from 'svelte';
	import { stateBet } from 'state-shared';
	import { stateConfig } from 'state-shared';
	import config from '../game/config';
	import { stateApp } from '../game/stateApp';

	type Props = { children: Snippet };
	const props: Props = $props();

	let isAuthenticated = $state(false);

	onMount(() => {
		// Set mock authentication data for development
		stateBet.update((state) => {
			state.balance = {
				amount: 10000000, // $100.00
				currency: 'USD'
			};
			state.bet = 100; // $1.00
			state.betLevel = 1;
			return state;
		});

		stateConfig.update((state) => {
			state.jurisdiction = {
				socialCasino: false,
				disabledFullscreen: false,
				disabledTurbo: false,
				disabledSuperTurbo: false,
				disabledAutoplay: false,
				disabledSlamstop: false,
				disabledSpacebar: false,
				disabledBuyFeature: false,
				displayNetPosition: true,
				displayRTP: true,
				displaySessionTimer: true,
				minimumRoundDuration: 0
			};
			state.betLevels = [100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000];
			state.defaultBetLevel = 1;
			state.betModes = config.betModes;
			return state;
		});

		// Mark as authenticated and loaded after a brief delay
		setTimeout(() => {
			// Force the app to be marked as loaded
			stateApp.loaded = true;
			isAuthenticated = true;
		}, 100);
	});
</script>

{#if isAuthenticated}
	{@render props.children()}
{:else}
	<div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: white;">
		Loading...
	</div>
{/if}