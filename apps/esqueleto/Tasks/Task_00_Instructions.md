# Task 00: Project Instructions & Progress Tracker

## Overview
This document serves as the central guide for implementing Esqueleto Explosivo 3. It contains instructions for completing tasks, tracking progress, and maintaining project consistency.

## 🔄 REUSABILITY NOTICE
**IMPORTANT**: This project heavily reuses components from existing games, especially the cluster game. Always check existing implementations before creating new components.

### Key Reusable Sources:
- **Cluster Game**: Tumbling mechanics, win displays, cascading logic, **cluster detection**
- **Scatter Game**: Multiplier systems, special symbol handling
- **Shared Packages**: utils-slots, components-shared, state-shared

## Task Completion Workflow

### 1. Before Starting a Task
- [ ] Read the complete task file
- [ ] Check all dependencies are completed
- [ ] Review relevant PRD sections
- [ ] **CHECK EXISTING CODE** for reusable components
- [ ] Set up your development environment

### 2. During Task Implementation
- [ ] Follow the checklist in order
- [ ] Reuse existing components when possible
- [ ] Write tests for NEW components only
- [ ] Document any new code
- [ ] Commit changes frequently

### 3. After Completing a Task
- [ ] Mark all subtasks as complete [x]
- [ ] Run all tests
- [ ] Update this file's progress tracker
- [ ] Document which components were reused
- [ ] Review with team if needed

## Checklist Format
- `[ ]` - Pending task
- `[x]` - Completed task
- `[~]` - In progress
- `[!]` - Blocked or needs attention
- `[R]` - Reusing existing component

## 🎨 ASSET REUSE POLICY
**CRITICAL**: For all game assets (symbols, animations, sounds):
1. **REUSE existing assets** from other games (cluster, scatter, lines, ways, price)
2. **Map symbols** to closest matching existing assets:
   - LDY (Lady Skull) → Use H1 (highest value symbol)
   - PNK (Pink Skull) → Use H2 
   - GRN (Green Skull) → Use H3
   - BLU (Blue Skull) → Use H4
   - ORG (Orange Skull) → Use L1
   - CYN (Cyan Skull) → Use L2
   - WLD → Use W (wild)
   - EW (Explosivo Wild) → Use W with explosion animation
   - SCR → Use S (scatter)
3. **Sounds**: Use existing sound effects from cluster game
4. **Animations**: Reuse spine animations, especially explosion effects
5. **Document all asset mappings** for future reference

## Progress Tracker

### Setup Phase
- [x] Task_01_Project_Setup - Initial project configuration
- [x] Task_02_Game_Config - Game configuration (reuse patterns)
- [x] Task_03_Symbol_System - [R] Reuse existing symbol components with asset mapping

### Core Mechanics
- [x] Task_04_Grid_System - [R] Extended cluster's 7x7 to 5x5
- [x] Task_05_Cluster_Detection - [R] Server-side detection (no client implementation needed)
- [ ] Task_06_Avalanche_System - [R] Reuse TumbleBoard components
- [ ] Task_07_Win_Calculation - [R] Adapt cluster win calculation

### Special Features
- [x] Task_08_Wild_Spawning - NEW wild spawn mechanic (wildSpawn.ts created)
- [x] Task_09_Explosivo_Wild - NEW explosion feature (explosion.ts created)
- [x] Task_10_Multiplier_System - [R] Extended GlobalMultiplier in bookEventHandlerMapExtended.ts
- [x] Task_11_Free_Spins - [R] Reused free spin components + EWCollectionTracker.svelte

### UI/UX Components
- [ ] Task_12_Game_Display - [R] Reuse Board components
- [ ] Task_13_Animations - [R] Extend existing animations
- [ ] Task_14_UI_Controls - [R] Reuse control components
- [ ] Task_15_Audio_System - [R] Reuse sound system

### Integration & Testing
- [ ] Task_16_State_Management - [R] Use existing patterns
- [ ] Task_17_Server_Integration - [R] Extend bookEventHandler
- [ ] Task_18_Testing_Suite - Focus on NEW components
- [ ] Task_19_Performance - Optimize NEW features

### Final Phase
- [ ] Task_20_Polish_Deploy - Final integration

## Reusable Component Map

### From Cluster Game
```
detectClusters() → Use cluster detection as-is
TumbleBoard.svelte → Use for cascading
TumbleSymbol.svelte → Use for falling symbols
ClusterWinAmount.svelte → Adapt for cluster wins
GlobalMultiplier.svelte → Use for multiplier display
tumbleBoard event → Extend for explosions
```

### From Shared Packages
```
utils-slots:
- createReelForCascading → Grid gravity
- CascadingReelSymbolState → Symbol states

components-shared:
- Button components → All UI buttons
- Modal components → Popups and dialogs
- BoardContext → Board state management
```

### New Components Needed
```
WildSpawner.ts → Progressive wild spawning
ExplosivoWild.svelte → Explosion effects
EWCollectionTracker.svelte → Free spins EW collection
Day of the Dead theming → Visual theme
```

## Development Guidelines

### Reusability First
1. ALWAYS check existing games for similar features
2. Extend existing components rather than rewrite
3. Document when you reuse vs create new
4. Keep component interfaces compatible

### Code Style
1. Follow existing patterns from cluster/scatter
2. Use TypeScript for all NEW game logic
3. Maintain consistent naming with other games
4. Add JSDoc comments for NEW APIs only

### Testing Requirements
1. Unit tests for NEW game logic only
2. Integration tests focus on Esqueleto-specific features
3. Reuse existing component tests
4. Test wild spawning and explosions

## PRD Quick Reference
- Grid: 5x5 (25 positions) - smaller than cluster's 7x7
- Cluster: 5+ connected symbols - REUSE cluster detection
- Multiplier: 1x → 2x → 4x → 8x → 16x → 32x - reuse system
- Free Spins: 3+ scatters trigger - reuse trigger logic
- Max Win: 7,500x bet - use existing cap system
- RTP: 94.22% (base), 94.40% (feature buy)

## Reusability Summary
- **~90% Reused**: Most code comes from existing games
- **~10% New**: Wild spawning, explosions, EW collection, theme
- **NO new cluster detection** - use cluster game's system
- **NO new cascade system** - extend cluster's tumbling

## Notes Section
Use this section to track important decisions, blockers, or changes:

### Reusability Decisions
- ✅ Using cluster's tumble system as base
- ✅ Using cluster's cluster detection as-is
- ✅ Extending multiplier rather than rewriting
- ✅ Wild spawning is main new feature
- ✅ Explosion effects are new
- ✅ Theme is CSS/assets only

### Known Dependencies
- Cluster game must be understood first
- Symbol system can be fully reused
- Board components need minor modifications
- Event system needs new event types for spawning/explosions

## Implementation Progress

### Completed Components
1. **Project Setup** ✅
   - Copied cluster game as base
   - Updated package.json with correct ports
   - Configured for 5x5 grid in config.ts
   
2. **Symbol System** ✅
   - Mapped Esqueleto symbols to existing assets:
     - LDY → H1, PNK → H2, GRN → H3, BLU → H4, ORG → L1, CYN → L2
   - Reused all animations from cluster game
   - Updated constants.ts with proper asset mappings
   
3. **Core Features** ✅
   - Created wildSpawn.ts for progressive wild spawning
   - Created explosion.ts for Explosivo Wild mechanics
   - Created EWCollectionTracker.svelte for free spins
   - Extended bookEventHandlerMap with Esqueleto logic
   
4. **Reused Components** ✅
   - Cluster detection (server-side)
   - TumbleBoard for cascading
   - GlobalMultiplier system
   - Free spin framework
   - All UI components from cluster

### Current Status
- Core game logic implementation is ~70% complete
- All new features have been created
- Need to integrate components and test
- Theme styling still pending
- **Storybook is running successfully on port 6009** ✅

### Next Steps
1. Update main game components to use extended bookEventHandlerMap
2. Integrate EWCollectionTracker into the game UI
3. Apply Day of the Dead theme styling
4. Run and test the game
5. Fine-tune animations and sounds

---
Last Updated: June 13, 2024
Updated By: Claude