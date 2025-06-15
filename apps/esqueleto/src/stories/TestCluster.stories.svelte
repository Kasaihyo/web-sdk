<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'TEST/Cluster Detection',
	});
</script>

<script lang="ts">
	import {
		StoryGameTemplate,
		StoryLocale,
		type TemplateArgs,
		templateArgs,
	} from 'components-storybook';

	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { playBet } from '../game/utils';

	setTemplate(template);
	setContext();

	// Create a simple 5x5 board with a clear cluster win
	const clusterBook = {
		id: 1,
		payoutMultiplier: 10.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					// 5 columns, each with 7 symbols (1 padding + 5 visible + 1 padding)
					[{ name: 'CYN' }, { name: 'LDY' }, { name: 'LDY' }, { name: 'LDY' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }],
					[{ name: 'ORG' }, { name: 'LDY' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }],
					[{ name: 'BLU' }, { name: 'LDY' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }],
					[{ name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }],
					[{ name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				anticipation: [],
				gameType: 'basegame' as const
			},
			{
				index: 1,
				type: 'winInfo',
				wins: [
					{
						symbol: 'LDY',
						amount: 100,
						positions: [
							{ reel: 0, row: 1 },
							{ reel: 0, row: 2 },
							{ reel: 0, row: 3 },
							{ reel: 1, row: 1 },
							{ reel: 1, row: 2 },
							{ reel: 2, row: 1 },
							{ reel: 2, row: 3 },
						],
						meta: {
							winWithoutMult: 100,
							globalMult: 1,
							overlay: { reel: 1, row: 2 } // Center of cluster
						}
					}
				]
			},
			{
				index: 2,
				type: 'setTotalWin',
				amount: 100
			},
			{
				index: 3,
				type: 'finalWin',
				amount: 100
			}
		]
	};
</script>

{#snippet template(args: TemplateArgs<any>)}
	<StoryGameTemplate
		skipLoadingScreen={args.skipLoadingScreen}
		action={async () => {
			await args.action?.(args.data);
		}}
	>
		<StoryLocale lang="en">
			<Game />
		</StoryLocale>
	</StoryGameTemplate>
{/snippet}

<Story
	name="simple cluster win"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('Playing cluster book:', clusterBook);
			await playBet({ ...clusterBook, state: clusterBook.events });
		},
	})}
/>