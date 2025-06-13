import type { Preview } from '@storybook/svelte';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
	parameters: {
		layout: 'fullscreen',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			defaultViewport: 'stake',
			viewports: {
				...INITIAL_VIEWPORTS,
				stake: {
					name: 'stake iframe',
					styles: {
						width: '1200px',
						height: '675px',
					},
				},
			},
		},
	},
};

export default preview;
