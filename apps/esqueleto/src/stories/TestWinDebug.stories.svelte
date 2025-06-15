<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'TEST/Win Debug',
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

	// Create a simple 5x5 board with a winning cluster in converted data format
	const winBook = {
		id: 1,
		payoutMultiplier: 10.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					// 5 columns from converted data (was 7x7, now 5x5)
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
							// These are positions from 7x7 that need conversion
							{ reel: 1, row: 1 }, // Should become reel: 0, row: 1
							{ reel: 1, row: 2 }, // Should become reel: 0, row: 2
							{ reel: 1, row: 3 }, // Should become reel: 0, row: 3
							{ reel: 2, row: 1 }, // Should become reel: 1, row: 1
							{ reel: 2, row: 2 }, // Should become reel: 1, row: 2
							{ reel: 3, row: 1 }, // Should become reel: 2, row: 1
							{ reel: 3, row: 3 }, // Should become reel: 2, row: 3
						],
						meta: {
							winWithoutMult: 100,
							globalMult: 1,
							overlay: { reel: 2, row: 2 } // Center of cluster in 7x7, should become reel: 1, row: 2
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
	name="debug win positions"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('Playing win debug book:', winBook);
			await playBet({ ...winBook, state: winBook.events });
		},
	})}
/>