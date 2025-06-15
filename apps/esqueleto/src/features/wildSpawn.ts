import type { Position } from '../game/types';
import type { Cluster } from '../game/clusterDetection';
import config from '../game/config';

export interface WildSpawnEvent {
	position: Position;
	wildType: 'WLD' | 'EW';
	clusterId: number;
}

export class WildSpawner {
	/**
	 * Spawns wilds after cluster wins with 100% chance
	 * 50% chance for regular WLD, 50% chance for Explosivo Wild (EW)
	 */
	spawn(clusters: Cluster[]): WildSpawnEvent[] {
		const spawns: WildSpawnEvent[] = [];
		
		clusters.forEach((cluster, index) => {
			// 100% chance to spawn a wild per cluster
			if (Math.random() < config.wildSpawnChance) {
				// Get all positions from the cluster
				const clusterPositions = cluster.positions;
				
				// Choose a random position within the cluster footprint
				const randomIndex = Math.floor(Math.random() * clusterPositions.length);
				const spawnPosition = clusterPositions[randomIndex];
				
				// Determine wild type: 50% WLD, 50% EW
				const wildType = Math.random() < config.wildSpawnTypes.WLD ? 'WLD' : 'EW';
				
				spawns.push({
					position: spawnPosition,
					wildType,
					clusterId: index
				});
			}
		});
		
		return spawns;
	}
	
	/**
	 * Validates if a position is valid for wild spawning
	 */
	isValidSpawnPosition(position: Position, gridWidth: number, gridHeight: number): boolean {
		return position.x >= 0 && 
			   position.x < gridWidth && 
			   position.y >= 0 && 
			   position.y < gridHeight;
	}
	
	/**
	 * Gets unique spawn positions to avoid multiple wilds in same spot
	 */
	getUniqueSpawnPositions(spawns: WildSpawnEvent[]): WildSpawnEvent[] {
		const uniquePositions = new Map<string, WildSpawnEvent>();
		
		spawns.forEach(spawn => {
			const key = `${spawn.position.x},${spawn.position.y}`;
			// If position already has a wild, prefer EW over WLD
			if (!uniquePositions.has(key) || spawn.wildType === 'EW') {
				uniquePositions.set(key, spawn);
			}
		});
		
		return Array.from(uniquePositions.values());
	}
}

// Export singleton instance
export const wildSpawner = new WildSpawner();