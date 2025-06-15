import type { Position } from '../game/types';
import config from '../game/config';

export interface ExplosionResult {
	destroyedPositions: Position[];
	affectedSymbols: string[];
	centerPosition: Position;
	explosionArea: Position[];
}

export class ExplosionSystem {
	/**
	 * Calculates the 3x3 explosion area around an Explosivo Wild
	 */
	getExplosionArea(centerPosition: Position, gridWidth: number, gridHeight: number): Position[] {
		const area: Position[] = [];
		const radius = config.explosionRadius; // 1 for 3x3 area
		
		for (let dx = -radius; dx <= radius; dx++) {
			for (let dy = -radius; dy <= radius; dy++) {
				const x = centerPosition.x + dx;
				const y = centerPosition.y + dy;
				
				// Check bounds
				if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
					area.push({ x, y });
				}
			}
		}
		
		return area;
	}
	
	/**
	 * Performs explosion, destroying only low-pay symbols in the area
	 */
	explode(
		ewPositions: Position[], 
		board: (string | null)[][], 
		gridWidth: number, 
		gridHeight: number
	): ExplosionResult[] {
		const results: ExplosionResult[] = [];
		
		ewPositions.forEach(ewPos => {
			const explosionArea = this.getExplosionArea(ewPos, gridWidth, gridHeight);
			const destroyedPositions: Position[] = [];
			const affectedSymbols: string[] = [];
			
			explosionArea.forEach(pos => {
				const symbol = board[pos.x][pos.y];
				
				// Only destroy low-pay symbols
				if (symbol && config.explosionTargets.includes(symbol)) {
					destroyedPositions.push(pos);
					affectedSymbols.push(symbol);
					// Mark position as destroyed
					board[pos.x][pos.y] = null;
				}
			});
			
			results.push({
				destroyedPositions,
				affectedSymbols,
				centerPosition: ewPos,
				explosionArea
			});
		});
		
		return results;
	}
	
	/**
	 * Checks if a position contains a low-pay symbol that can be destroyed
	 */
	canBeDestroyed(symbol: string): boolean {
		return config.explosionTargets.includes(symbol);
	}
	
	/**
	 * Triggers multiplier increase when EW explodes
	 */
	triggerMultiplierIncrease(): void {
		// This would emit an event to increase the global multiplier
		// The actual multiplier logic is handled by the existing GlobalMultiplier component
	}
}

// Export singleton instance
export const explosionSystem = new ExplosionSystem();