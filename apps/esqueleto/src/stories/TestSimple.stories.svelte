<script lang="ts" module>
	import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'TEST/Simple',
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

	// Create a simple 5x5 board with esqueleto symbols
	const simpleBook = {
		id: 1,
		payoutMultiplier: 0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					// 5 columns, each with 7 symbols (1 padding + 5 visible + 1 padding)
					[{ name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }],
					[{ name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }],
					[{ name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }],
					[{ name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }, { name: 'GRN' }],
					[{ name: 'PNK' }, { name: 'GRN' }, { name: 'BLU' }, { name: 'ORG' }, { name: 'CYN' }, { name: 'LDY' }, { name: 'PNK' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				anticipation: [],
				gameType: 'basegame' as const
			},
			{
				index: 1,
				type: 'setTotalWin',
				amount: 0
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
	name="simple board"
	args={templateArgs({
		skipLoadingScreen: true,
		data: {},
		action: async () => {
			console.log('Playing simple book:', simpleBook);
			await playBet({ ...simpleBook, state: simpleBook.events });
		},
	})}
/>