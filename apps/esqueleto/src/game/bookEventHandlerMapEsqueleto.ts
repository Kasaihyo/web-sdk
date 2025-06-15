import _ from 'lodash';
import { wildSpawner } from '../features/wildSpawn';
import { explosionSystem } from '../features/explosion';
import { extractClustersFromWins } from './clusterDetection';
import { eventEmitter } from './eventEmitter';
import { bookEventHandlerMap as baseMap } from './bookEventHandlerMap';
import type { BookEventOfType, BookEventContext } from './typesBookEvent';

// Store for tracking EW collection in free spins
let ewCollectionState = {
	collected: 0,
	target: 3
};

// Extend the base bookEventHandlerMap with Esqueleto-specific features
export const bookEventHandlerMapExtended = {
	// Keep all existing handlers
	...baseMap,
	
	// Override winInfo to add wild spawning logic and fix position conversion
	winInfo: async (bookEvent: BookEventOfType<'winInfo'>, context: BookEventContext) => {
		console.log('Original wins:', bookEvent.wins.map(w => ({
			symbol: w.symbol,
			positions: w.positions,
			overlay: w.meta?.overlay
		})));
		
		// Convert 7x7 positions to 5x5 for display
		const convertedWins = bookEvent.wins.map(win => {
			// Convert overlay position from 7x7 to 5x5
			let convertedReel = win.meta.overlay.reel;
			let convertedRow = win.meta.overlay.row;
			
			// If we're getting 7x7 positions (0-6), convert to 5x5 (0-4)
			if (convertedReel >= 1 && convertedReel <= 5) {
				convertedReel = convertedReel - 1; // 1-5 becomes 0-4
			}
			
			// Rows might also need adjustment
			if (convertedRow >= 1 && convertedRow <= 5) {
				// Row positions are already 1-5 which is what ClusterWinAmount expects
				// No conversion needed for rows
			}
			
			return {
				...win,
				meta: {
					...win.meta,
					overlay: {
						reel: Math.max(0, Math.min(4, convertedReel)),
						row: Math.max(1, Math.min(5, convertedRow))
					}
				}
			};
		});
		
		// Display wins with converted positions
		const promise1 = async () => {
			eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_winlevel_small' });
			// Convert symbol positions too
			const convertedPositions = _.flatten(convertedWins.map((win) => 
				win.positions.map(pos => {
					// Convert from 7x7 to 5x5 coordinates
					if (pos.reel >= 1 && pos.reel <= 5 && pos.row >= 1 && pos.row <= 5) {
						return {
							reel: pos.reel - 1, // 1-5 becomes 0-4
							row: pos.row - 1   // 1-5 becomes 0-4
						};
					}
					return pos;
				})
			));
			await eventEmitter.broadcastAsync({
				type: 'boardWithAnimateSymbols',
				symbolPositions: convertedPositions
			});
		};

		const promise2 = async () => {
			await eventEmitter.broadcastAsync({
				type: 'showClusterWinAmounts',
				wins: convertedWins.map((win) => {
					return {
						win: win.meta.winWithoutMult,
						mult: win.meta.globalMult,
						result: win.meta.winWithoutMult * win.meta.globalMult,
						reel: win.meta.overlay.reel,
						row: win.meta.overlay.row,
					};
				}),
			});
		};

		await Promise.all([promise1(), promise2()]);
		
		// Extract clusters for wild spawning (server would normally do this)
		const clusters = extractClustersFromWins(bookEvent.wins);
		
		// Generate wild spawns for next tumble
		if (clusters.length > 0) {
			const wildSpawns = wildSpawner.spawn(clusters);
			
			// Store spawns in context for the next tumble
			context.metadata = {
				...context.metadata,
				pendingWildSpawns: wildSpawns
			};
		}
	},
	
	// Override tumbleBoard to add wild spawning and explosion handling
	tumbleBoard: async (bookEvent: BookEventOfType<'tumbleBoard'>, context: BookEventContext) => {
		// Execute base tumble animation
		await baseMap.tumbleBoard(bookEvent, context);
		
		// Handle wild spawning after tumble
		const pendingSpawns = context.metadata?.pendingWildSpawns;
		if (pendingSpawns && pendingSpawns.length > 0) {
			for (const spawn of pendingSpawns) {
				// Animate wild spawn
				const soundName = spawn.wildType === 'EW' ? 'sfx_multiplier_explosion_a' : 'sfx_win_scatter';
				eventEmitter.broadcast({ type: 'soundOnce', name: soundName });
				
				await eventEmitter.broadcastAsync({
					type: 'animateWildSpawn',
					position: spawn.position,
					wildType: spawn.wildType
				});
			}
			
			// Clear pending spawns
			delete context.metadata.pendingWildSpawns;
		}
		
		// Handle EW explosions if any
		if (bookEvent.metadata?.ewExplosions) {
			await handleEWExplosions(bookEvent.metadata.ewExplosions);
		}
		
		// In free spins, check for EW collection
		if (context.gameType === 'freegame' && bookEvent.metadata?.ewsCollected) {
			await handleEWCollection(bookEvent.metadata.ewsCollected);
		}
	},
	
	// Override updateGlobalMult to add explosion effect
	updateGlobalMult: async (bookEvent: BookEventOfType<'updateGlobalMult'>) => {
		// If multiplier increased (not reset), play explosion sound
		if (bookEvent.globalMult > 1) {
			eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_c' });
		}
		
		// Execute base multiplier update
		await baseMap.updateGlobalMult(bookEvent);
	},
	
	// Override freeSpinTrigger to show EW collection tracker
	freeSpinTrigger: async (bookEvent: BookEventOfType<'freeSpinTrigger'>, context: BookEventContext) => {
		// Execute base free spin trigger
		await baseMap.freeSpinTrigger(bookEvent, context);
		
		// Reset EW collection
		ewCollectionState.collected = 0;
		
		// Show EW collection tracker
		eventEmitter.broadcast({ type: 'ewCollectionShow' });
		eventEmitter.broadcast({
			type: 'ewCollectionUpdate',
			collected: 0,
			target: ewCollectionState.target
		});
	},
	
	// Override freeSpinEnd to hide EW collection
	freeSpinEnd: async (bookEvent: BookEventOfType<'freeSpinEnd'>, context: BookEventContext) => {
		// Hide EW collection tracker
		eventEmitter.broadcast({ type: 'ewCollectionHide' });
		
		// Execute base free spin end
		await baseMap.freeSpinEnd(bookEvent, context);
	}
};

// Helper function to handle EW explosions
async function handleEWExplosions(explosions: any[]) {
	for (const explosion of explosions) {
		// Play explosion animation
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_d' });
		
		await eventEmitter.broadcastAsync({
			type: 'animateExplosion',
			center: explosion.position,
			affectedPositions: explosion.destroyed,
			radius: 3
		});
		
		// Increase multiplier after explosion
		eventEmitter.broadcast({ type: 'increaseMultiplier' });
	}
}

// Helper function to handle EW collection in free spins
async function handleEWCollection(ewsCollected: number) {
	ewCollectionState.collected += ewsCollected;
	
	// Update EW collection display
	eventEmitter.broadcast({
		type: 'ewCollectionUpdate',
		collected: ewCollectionState.collected,
		target: ewCollectionState.target
	});
	
	// Check if collection complete
	if (ewCollectionState.collected >= ewCollectionState.target) {
		// Play collection complete sound
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_youwon_panel' });
		
		// Upgrade multiplier
		await eventEmitter.broadcastAsync({ type: 'upgradeMultiplier' });
		
		// Reset collection
		ewCollectionState.collected = 0;
		
		// Update display
		setTimeout(() => {
			eventEmitter.broadcast({
				type: 'ewCollectionUpdate',
				collected: 0,
				target: ewCollectionState.target
			});
		}, 1000);
	}
}

// Export the extended handler map
// (Already exported as a const above, no need to re-export)