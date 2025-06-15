import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = 100; // Larger symbols for 5x5 grid

export const REEL_PADDING = 0.53;

// initial board for 5x5 (padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{ name: 'CYN' },
		{ name: 'LDY' },
		{ name: 'PNK' },
		{ name: 'GRN' },
		{ name: 'BLU' },
		{ name: 'ORG' },
		{ name: 'CYN' },
	],
	[
		{ name: 'ORG' },
		{ name: 'BLU' },
		{ name: 'GRN' },
		{ name: 'PNK' },
		{ name: 'LDY' },
		{ name: 'CYN' },
		{ name: 'ORG' },
	],
	[
		{ name: 'BLU' },
		{ name: 'GRN' },
		{ name: 'PNK' },
		{ name: 'LDY' },
		{ name: 'CYN' },
		{ name: 'ORG' },
		{ name: 'BLU' },
	],
	[
		{ name: 'GRN' },
		{ name: 'PNK' },
		{ name: 'LDY' },
		{ name: 'CYN' },
		{ name: 'ORG' },
		{ name: 'BLU' },
		{ name: 'GRN' },
	],
	[
		{ name: 'PNK' },
		{ name: 'LDY' },
		{ name: 'CYN' },
		{ name: 'ORG' },
		{ name: 'BLU' },
		{ name: 'GRN' },
		{ name: 'PNK' },
	],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['LDY'];
export const LOW_SYMBOLS = ['CYN', 'ORG', 'BLU', 'GRN'];
export const SPECIAL_SYMBOLS = ['WLD', 'EW', 'SCR'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const HIGH_SYMBOL_SIZE = 1.0;
const LOW_SYMBOL_SIZE = 0.9;
const SPECIAL_SYMBOL_SIZE = 1.1;

const SPIN_OPTIONS_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 3.5,
	symbolFallInInterval: 30,
	symbolFallInBounceSpeed: 0.15,
	symbolFallInBounceSizeMulti: 0.5,
	symbolFallOutSpeed: 3.5,
	symbolFallOutInterval: 20,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

const explosion = {
	type: 'spine',
	assetKey: 'explosion',
	animationName: 'explosion',
	sizeRatios: { width: 1.5, height: 1.5 }, // Bigger explosion for EW
};

// REUSING EXISTING ASSETS - Mapping Esqueleto symbols to cluster assets
// LDY (Lady Skull) → H1 (highest value)
const ldyStatic = { type: 'sprite', assetKey: 'h1.webp', sizeRatios: { width: 1, height: 1 } };
// PNK (Pink Skull) → H2
const pnkStatic = { type: 'sprite', assetKey: 'h2.webp', sizeRatios: { width: 1, height: 1 } };
// GRN (Green Skull) → H3
const grnStatic = { type: 'sprite', assetKey: 'h3.webp', sizeRatios: { width: 1, height: 1 } };
// BLU (Blue Skull) → H4
const bluStatic = { type: 'sprite', assetKey: 'h4.webp', sizeRatios: { width: 1, height: 1 } };
// ORG (Orange Skull) → L1
const orgStatic = { type: 'sprite', assetKey: 'l1.webp', sizeRatios: { width: 1, height: 1 } };
// CYN (Cyan Skull) → L2
const cynStatic = { type: 'sprite', assetKey: 'l2.webp', sizeRatios: { width: 1, height: 1 } };

// Special symbols - using existing assets
const scrStatic = { type: 'sprite', assetKey: 's.png', sizeRatios: { width: 1.243, height: 1.243 } };
const wldStatic = { type: 'sprite', assetKey: 'w.png', sizeRatios: { width: 1.12, height: 1.12 } };
// EW uses same asset as W but with different animations
const ewStatic = { type: 'sprite', assetKey: 'w.png', sizeRatios: { width: 1.2, height: 1.2 } };

const wldSizeRatios = { width: SPECIAL_SYMBOL_SIZE * 1.5, height: SPECIAL_SYMBOL_SIZE * 1.15 };
const ewSizeRatios = { width: SPECIAL_SYMBOL_SIZE * 1.6, height: SPECIAL_SYMBOL_SIZE * 1.2 };
const scrSizeRatios = { width: SPECIAL_SYMBOL_SIZE * 2.5, height: SPECIAL_SYMBOL_SIZE * 2.3 };

export const SYMBOL_INFO_MAP = {
	// High-pay symbol - LDY mapped to H1
	LDY: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'H1',
			animationName: 'h1',
			sizeRatios: { width: 0.5 * 1.15, height: HIGH_SYMBOL_SIZE * 0.57 },
		},
		postWinStatic: ldyStatic,
		static: ldyStatic,
		spin: ldyStatic,
		land: ldyStatic,
	},
	// Mid-pay symbols - mapped to existing high symbols
	PNK: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'H2',
			animationName: 'h2',
			sizeRatios: { width: 0.5, height: HIGH_SYMBOL_SIZE * 0.57 },
		},
		postWinStatic: pnkStatic,
		static: pnkStatic,
		spin: pnkStatic,
		land: pnkStatic,
	},
	GRN: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'H3',
			animationName: 'h3',
			sizeRatios: { width: 0.5 * 0.9, height: HIGH_SYMBOL_SIZE * 0.53 },
		},
		postWinStatic: grnStatic,
		static: grnStatic,
		spin: grnStatic,
		land: grnStatic,
	},
	// Low-pay symbols - mapped to existing symbols
	BLU: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'H4',
			animationName: 'h4',
			sizeRatios: { width: 0.5 * 0.9, height: HIGH_SYMBOL_SIZE * 0.53 },
		},
		postWinStatic: bluStatic,
		static: bluStatic,
		spin: bluStatic,
		land: bluStatic,
	},
	ORG: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'L1',
			animationName: 'l1',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.65 },
		},
		postWinStatic: orgStatic,
		static: orgStatic,
		spin: orgStatic,
		land: orgStatic,
	},
	CYN: {
		explosion,
		win: {
			type: 'spine',
			assetKey: 'L2',
			animationName: 'l2',
			sizeRatios: { width: 0.5 * 0.75, height: LOW_SYMBOL_SIZE * 0.65 },
		},
		postWinStatic: cynStatic,
		static: cynStatic,
		spin: cynStatic,
		land: cynStatic,
	},
	// Wild symbols
	WLD: {
		explosion,
		postWinStatic: wldStatic,
		static: wldStatic,
		spin: wldStatic,
		win: { type: 'spine', assetKey: 'W', animationName: 'win', sizeRatios: wldSizeRatios },
		land: {
			type: 'spine',
			assetKey: 'W',
			animationName: 'land',
			sizeRatios: wldSizeRatios,
		},
	},
	EW: {
		explosion: {
			type: 'spine',
			assetKey: 'explosion',
			animationName: 'explosion',
			sizeRatios: { width: 3, height: 3 }, // 3x3 explosion area
		},
		postWinStatic: {
			type: 'sprite',
			assetKey: 'explodedW.png',
			sizeRatios: { width: 0.85, height: 0.85 },
		},
		static: ewStatic,
		spin: ewStatic,
		win: { type: 'spine', assetKey: 'W', animationName: 'win', sizeRatios: ewSizeRatios },
		land: {
			type: 'spine',
			assetKey: 'W',
			animationName: 'land',
			sizeRatios: ewSizeRatios,
		},
	},
	// Scatter symbol
	SCR: {
		explosion,
		postWinStatic: scrStatic,
		static: scrStatic,
		spin: {
			type: 'spine',
			assetKey: 'S',
			animationName: 'spin',
			sizeRatios: scrSizeRatios,
		},
		win: { type: 'spine', assetKey: 'S', animationName: 'win', sizeRatios: scrSizeRatios },
		land: {
			type: 'spine',
			assetKey: 'S',
			animationName: 'land',
			sizeRatios: scrSizeRatios,
		},
	},
} as const;

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;