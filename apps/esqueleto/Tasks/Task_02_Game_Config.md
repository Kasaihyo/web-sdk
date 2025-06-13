# Task 02: Game Configuration

## Dependencies
- [x] Task_01_Project_Setup

## PRD Reference
- Section 3: Paytable
- Section 6: Multiplier System
- Section 9: Special Features
- Section 10: Symbol Distribution & Weights

## Overview
Implement comprehensive game configuration including symbols, paytables, weights, and game modes.

## Implementation Details

### Configuration Structure
The game configuration should support:
- Symbol definitions with paytables
- Weight distributions for base game and free spins
- Bet modes including Bet+ options
- Feature buy configuration

## Subtasks

### 1. Define Symbol Configuration
- [ ] Create symbol definitions with properties:
  ```typescript
  symbols: {
    LDY: {
      type: 'HP',
      displayName: 'Lady Skull',
      color: '#FF0000',
      paytable: [
        { 5: 1.0 },
        { 6: 1.5 },
        { 7: 2.5 },
        { 8: 5.0 },
        { 9: 5.0 },
        { 10: 7.5 },
        { 11: 7.5 },
        { 12: 25.0 },
        { 13: 25.0 },
        { 14: 25.0 },
        { 15: 150.0 }
      ]
    },
    // ... other symbols
  }
  ```
- [ ] Add all LP symbols (PNK, GRN, BLU, ORG, CYN)
- [ ] Configure special symbols (WLD, EW, SCR)
- [ ] Set special_properties arrays

### 2. Implement Weight Distributions
- [ ] Create base game weights:
  ```typescript
  baseGameWeights: {
    LDY: 3,    // ~2.5%
    PNK: 14,   // ~11.7%
    GRN: 16,   // ~13.3%
    BLU: 18,   // ~15.0%
    ORG: 20,   // ~16.7%
    CYN: 22,   // ~18.3%
    WLD: 12,   // ~10.0%
    EW: 8,     // ~6.7%
    SCR: 7     // ~5.8%
  }
  ```
- [ ] Create free spins weights with enrichment
- [ ] Add weight normalization function
- [ ] Implement cumulative distribution for optimization

### 3. Configure Bet Modes
- [ ] Standard base game mode:
  ```typescript
  base: {
    cost: 1.0,
    feature: true,
    buyBonus: false,
    rtp: 0.9422,
    max_win: 7500,
    weights: 'baseGameWeights'
  }
  ```
- [ ] Bonus Boost mode (1.5x bet, 2x scatter chance)
- [ ] The Enrico Show (2x bet, guaranteed EW)
- [ ] Bonus Boost Plus (3x bet, 5x scatter chance)
- [ ] Feature Buy (75x bet)

### 4. Set Up Multiplier Configuration
- [ ] Base game multiplier sequence: [1, 2, 4, 8, 16, 32]
- [ ] Free spins base levels: [1, 2, 4, 8, 16, 32]
- [ ] Trail progression calculation
- [ ] Maximum multiplier cap (1024x)

### 5. Define Paytable Structure
- [ ] Complete paytable for all symbols:
  ```typescript
  // Structure: cluster_size: multiplier
  paytables: {
    LDY: {
      5: 1.0,
      6: 1.5,
      7: 2.5,
      '8-9': 5.0,
      '10-11': 7.5,
      '12-14': 25.0,
      '15+': 150.0
    },
    // ... other symbols
  }
  ```
- [ ] Add range support (8-9, 10-11, etc.)
- [ ] Implement lookup function for cluster sizes

### 6. Create Feature Configuration
- [ ] Free spins trigger requirements:
  ```typescript
  freeSpins: {
    trigger: {
      3: 10,  // 3 scatters = 10 spins
      4: 12,  // 4 scatters = 12 spins
      5: 14   // 5+ scatters = 12 + (n-4)*2
    },
    retrigger: {
      2: 3,   // 2 scatters = +3 spins
      3: 5,   // 3 scatters = +5 spins
      4: 7    // 4+ scatters = +7 + (n-4)*2
    }
  }
  ```
- [ ] EW collection configuration
- [ ] Upgrade thresholds and rewards

### 7. Add Special Feature Flags
- [ ] Wild spawning configuration
- [ ] Explosion mechanics settings
- [ ] Avalanche behavior flags
- [ ] Max win cap handling

### 8. Implement Configuration Validation
- [ ] Validate all required fields present
- [ ] Check weight distributions sum correctly
- [ ] Verify paytable values are positive
- [ ] Ensure RTP calculations are valid

## Acceptance Criteria
- [ ] All symbols have complete paytables
- [ ] Weight distributions normalize to 100%
- [ ] Bet modes have distinct configurations
- [ ] Multiplier sequences are defined
- [ ] Configuration passes validation
- [ ] TypeScript types are fully satisfied
- [ ] Config can be imported and used

## Code Example
```typescript
// src/game/config.ts
import type { GameConfig } from './types';

const config: GameConfig = {
  gameID: '0_0_esqueleto',
  gameName: 'esqueleto_explosivo_3',
  providerName: 'thunderkick',
  
  grid: {
    reels: 5,
    rows: 5,
    totalPositions: 25
  },
  
  symbols: {
    LDY: {
      type: 'HP',
      displayName: 'Lady Skull',
      color: '#FF0000',
      paytable: generatePaytable([1.0, 1.5, 2.5, 5.0, 5.0, 7.5, 7.5, 25.0, 25.0, 25.0, 150.0])
    },
    // ... more symbols
  },
  
  weights: {
    baseGame: normalizeWeights({
      LDY: 3,
      PNK: 14,
      // ...
    }),
    freeSpins: normalizeWeights({
      LDY: 4,
      PNK: 12,
      // ... with enrichment
    })
  },
  
  features: {
    wildSpawn: {
      probability: 1.0,
      distribution: { WLD: 0.5, EW: 0.5 }
    },
    explosion: {
      radius: 3,
      preserveTypes: ['HP', 'WILD', 'EXPLOSIVO', 'SCATTER']
    }
  }
};

export default config;
```

## Notes
- Keep configuration data-driven for easy tuning
- Consider adding configuration hot-reload for development
- Ensure all percentages and probabilities are clearly documented