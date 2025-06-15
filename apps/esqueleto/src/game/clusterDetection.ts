// Cluster detection happens server-side in the RGS backend
// The client receives detected clusters through book events (winInfo)
// This file exports types and utilities for handling cluster data

import type { Position } from './types';

export interface Cluster {
  positions: Position[];
  symbol: string;
  size: number;
  winAmount: number;
}

// Utility to extract cluster data from winInfo events
export function extractClustersFromWins(wins: any[]): Cluster[] {
  return wins.map(win => ({
    positions: win.positions,
    symbol: win.symbol,
    size: win.positions.length,
    winAmount: win.meta.winWithoutMult
  }));
}