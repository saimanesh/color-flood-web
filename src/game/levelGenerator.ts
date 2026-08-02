// ===== Procedural Level Generation =====
// 200 levels, seeded by level number. Grid size grows by 2 every 25 levels
// (8 -> 20), color count steps up at level boundaries. Move limit = greedy
// solver count + a buffer that shrinks from 6 to 2 across the campaign.

import { LevelData } from './types';
import { makeRng, randInt } from './rng';
import { greedySolveMoves } from './solver';

export const TOTAL_LEVELS = 200;
export const LEVELS_PER_WORLD = 20;
export const TOTAL_WORLDS = 10;

/** Grid size for a level: starts 8, +2 every 25 levels, capped at 20. */
export function gridSizeFor(level: number): number {
  const steps = Math.floor((level - 1) / 25);
  return Math.min(20, 8 + steps * 2);
}

/** Number of colors for a level. */
export function colorCountFor(level: number): number {
  if (level <= 60) return 4;
  if (level <= 140) return 5;
  return 6;
}

/** Buffer added to solver moves to form the move limit. Shrinks 6 -> 2. */
export function bufferFor(level: number): number {
  // Linear from 6 at level 1 to 2 at level 200.
  return Math.round(6 - (level - 1) * (4 / 199));
}

/** Which world (1..10) a level belongs to. */
export function worldFor(level: number): number {
  return Math.floor((level - 1) / LEVELS_PER_WORLD) + 1;
}

/** Generate a deterministic level. */
export function generateLevel(level: number): LevelData {
  const size = gridSizeFor(level);
  const colors = colorCountFor(level);
  const rng = makeRng(level * 9973 + 17);
  const grid: number[] = new Array(size * size);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = randInt(rng, colors);
  }
  const solverMoves = greedySolveMoves(grid, size, colors);
  const maxMoves = solverMoves + bufferFor(level);
  return { level, world: worldFor(level), size, colors, grid, maxMoves };
}
