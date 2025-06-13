# Task 01: Project Setup

## Dependencies
- None (First task)

## PRD Reference
- Section 1: Grid Structure & Display
- Section 12: Technical Specifications
- Section 14: Platform & Technical Requirements

## Overview
Set up the initial project structure for Esqueleto Explosivo 3 as a new game app within the monorepo structure.

## Implementation Details

### Project Structure
```
apps/esqueleto/
├── package.json
├── src/
│   ├── components/
│   ├── game/
│   │   ├── config.ts
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── ...
│   ├── routes/
│   └── stories/
├── static/
│   └── assets/
│       ├── audio/
│       ├── sprites/
│       └── spines/
└── ...
```

## Subtasks

### 1. Create Project Structure
- [ ] Create new app directory: `apps/esqueleto`
- [ ] Copy base structure from cluster app (most similar mechanics)
- [ ] Update package.json with correct name and dependencies
- [ ] Configure build tools (vite, svelte config)

### 2. Configure Dependencies
- [ ] Add required dependencies to package.json:
  ```json
  {
    "dependencies": {
      "lodash": "latest",
      "svelte": "^5",
      "@sveltejs/kit": "latest",
      "pixi-svelte": "workspace:*",
      "state-shared": "workspace:*",
      "utils-slots": "workspace:*",
      "utils-book": "workspace:*",
      // ... other workspace packages
    }
  }
  ```
- [ ] Run pnpm install
- [ ] Verify all workspace packages are linked

### 3. Set Up Base Configuration
- [ ] Create initial config.ts with game settings:
  ```typescript
  export default {
    gameID: '0_0_esqueleto',
    gameName: 'esqueleto_explosivo_3',
    providerName: 'thunderkick',
    numReels: 5,
    numRows: [5, 5, 5, 5, 5],
    rtp: 0.9422,
    betModes: {
      base: {
        cost: 1.0,
        feature: true,
        buyBonus: false,
        rtp: 0.9422,
        max_win: 7500
      },
      featureBuy: {
        cost: 75.0,
        feature: false,
        buyBonus: true,
        rtp: 0.9440,
        max_win: 7500
      }
    }
  };
  ```

### 4. Initialize Type Definitions
- [ ] Create types.ts with basic types:
  ```typescript
  import { type CascadingReelSymbolState } from 'utils-slots';
  
  export type SymbolName = 'LDY' | 'PNK' | 'GRN' | 'BLU' | 'ORG' | 'CYN' | 'WLD' | 'EW' | 'SCR';
  export type SymbolType = 'HP' | 'LP' | 'WILD' | 'EXPLOSIVO' | 'SCATTER';
  export type BetMode = 'base' | 'featureBuy' | 'bonusBoost' | 'enricoShow' | 'bonusBoostPlus';
  
  export interface Position {
    reel: number;
    row: number;
  }
  
  export interface Cluster {
    symbol: SymbolName;
    positions: Position[];
    size: number;
    value: number;
  }
  ```

### 5. Create Constants File
- [ ] Define game constants in constants.ts:
  ```typescript
  export const GRID_SIZE = 5;
  export const MIN_CLUSTER_SIZE = 5;
  export const MAX_TRACKED_CLUSTER_SIZE = 15;
  
  export const MULTIPLIER_SEQUENCE = [1, 2, 4, 8, 16, 32];
  export const FS_MULTIPLIER_CAP = 1024;
  
  export const WILD_SPAWN_CHANCE = 1.0; // 100%
  export const EW_SPAWN_RATIO = 0.5; // 50% EW, 50% WLD
  
  export const EXPLOSION_RADIUS = 3; // 3x3 area
  export const EW_COLLECTION_TARGET = 3; // Collect 3 for upgrade
  ```

### 6. Set Up Development Environment
- [ ] Configure ESLint rules
- [ ] Set up Prettier formatting
- [ ] Create .env file for local development
- [ ] Configure TypeScript paths in tsconfig.json

### 7. Create Initial Route Structure
- [ ] Set up +layout.svelte with basic structure
- [ ] Create +page.svelte placeholder
- [ ] Configure routing in svelte.config.js

### 8. Initialize Storybook
- [ ] Create .storybook configuration
- [ ] Add initial story file for testing
- [ ] Verify storybook runs correctly
- [ ] Set up component story structure

## Acceptance Criteria
- [ ] Project builds without errors
- [ ] All dependencies are properly installed
- [ ] Basic configuration is in place
- [ ] TypeScript compiles successfully
- [ ] Storybook launches and displays
- [ ] Project follows monorepo conventions
- [ ] Can run dev server on designated port

## Code Example
```typescript
// Example initial component structure
// src/components/Game.svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import type { SymbolName } from '../game/types';
  
  let grid: SymbolName[][] = [];
  
  onMount(() => {
    console.log('Esqueleto Explosivo 3 initialized');
  });
</script>

<div class="game-container">
  <!-- Game will be implemented here -->
</div>
```

## Notes
- Use cluster app as reference for cascading mechanics
- Ensure all paths use absolute imports with aliases
- Keep initial setup minimal and extensible