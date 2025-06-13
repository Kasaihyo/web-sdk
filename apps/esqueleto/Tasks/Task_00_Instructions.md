# Task 00: Project Instructions & Progress Tracker

## Overview
This document serves as the central guide for implementing Esqueleto Explosivo 3. It contains instructions for completing tasks, tracking progress, and maintaining project consistency.

## Task Completion Workflow

### 1. Before Starting a Task
- [ ] Read the complete task file
- [ ] Check all dependencies are completed
- [ ] Review relevant PRD sections
- [ ] Set up your development environment

### 2. During Task Implementation
- [ ] Follow the checklist in order
- [ ] Write tests for each component
- [ ] Document your code
- [ ] Commit changes frequently

### 3. After Completing a Task
- [ ] Mark all subtasks as complete [x]
- [ ] Run all tests
- [ ] Update this file's progress tracker
- [ ] Review with team if needed

## Checklist Format
- `[ ]` - Pending task
- `[x]` - Completed task
- `[~]` - In progress
- `[!]` - Blocked or needs attention

## Task Naming Convention
- Task_01_Setup.md - Infrastructure and setup tasks
- Task_02_Core.md - Core game mechanics
- Task_03_Feature.md - Specific features
- Task_XX_Component.md - Individual components

## Progress Tracker

### Setup Phase
- [ ] Task_01_Project_Setup - Initial project configuration
- [ ] Task_02_Game_Config - Game configuration and constants
- [ ] Task_03_Symbol_System - Symbol types and management

### Core Mechanics
- [ ] Task_04_Grid_System - 5x5 grid implementation
- [ ] Task_05_Cluster_Detection - Cluster pays algorithm
- [ ] Task_06_Avalanche_System - Cascading mechanics
- [ ] Task_07_Win_Calculation - Paytable and win logic

### Special Features
- [ ] Task_08_Wild_Spawning - Wild spawn mechanic
- [ ] Task_09_Explosivo_Wild - EW explosion feature
- [ ] Task_10_Multiplier_System - Progressive multipliers
- [ ] Task_11_Free_Spins - Free spins feature

### UI/UX Components
- [ ] Task_12_Game_Display - Visual grid and symbols
- [ ] Task_13_Animations - Symbol animations and effects
- [ ] Task_14_UI_Controls - Bet controls and displays
- [ ] Task_15_Audio_System - Sound effects and music

### Integration & Testing
- [ ] Task_16_State_Management - Game state and persistence
- [ ] Task_17_Server_Integration - Backend communication
- [ ] Task_18_Testing_Suite - Comprehensive testing
- [ ] Task_19_Performance - Optimization and profiling

### Final Phase
- [ ] Task_20_Polish_Deploy - Final polish and deployment

## Development Guidelines

### Code Style
1. Use TypeScript for all game logic
2. Follow the existing codebase patterns
3. Write self-documenting code
4. Add JSDoc comments for public APIs

### Testing Requirements
1. Unit tests for all game logic
2. Integration tests for features
3. Visual regression tests for UI
4. Performance benchmarks

### Performance Targets
- 60 FPS animation target
- <100ms response time
- Efficient memory usage
- Smooth mobile experience

## Dependencies Map
```
Setup Tasks (01-03)
    ↓
Core Mechanics (04-07)
    ↓
Special Features (08-11) ← Can be parallel
    ↓
UI/UX (12-15) ← Can be parallel
    ↓
Integration (16-17)
    ↓
Testing (18-19)
    ↓
Deploy (20)
```

## PRD Quick Reference
- Grid: 5x5 (25 positions)
- Cluster: 5+ connected symbols
- Multiplier: 1x → 2x → 4x → 8x → 16x → 32x
- Free Spins: 3+ scatters trigger
- Max Win: 7,500x bet
- RTP: 94.22% (base), 94.40% (feature buy)

## Notes Section
Use this section to track important decisions, blockers, or changes:

### Decision Log
- Date: [Decision made]

### Known Issues
- Issue: [Description]

### Change Requests
- CR: [Description]

---
Last Updated: [Date]
Updated By: [Developer]