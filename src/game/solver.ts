// ===== Greedy Solver =====
// At each step, simulate every color choice and pick whichever grows the
// connected region the most. Repeat until solved or a safety cap is hit.
// The move count this solver needs (+ buffer) becomes the level's move limit,
// guaranteeing every level is always beatable.

import { applyMove, connectedRegion, isSolved } from './floodfill';

const SAFETY_CAP_MULTIPLIER = 4; // generous cap to avoid infinite loops on weird states

/**
 * Returns the number of moves the greedy solver needs to fully solve `grid`.
 */
export function greedySolveMoves(grid: number[], size: number, colors: number): number {
  let current = grid.slice();
  const cap = grid.length * SAFETY_CAP_MULTIPLIER;
  let moves = 0;
  while (!isSolved(current)) {
    if (moves > cap) break; // should never happen for real generated grids
    const startColor = current[0];
    let bestColor = -1;
    let bestSize = -1;
    for (let c = 0; c < colors; c++) {
      if (c === startColor) continue;
      const candidate = applyMove(current, size, c);
      const region = connectedRegion(candidate, size);
      if (region.size > bestSize) {
        bestSize = region.size;
        bestColor = c;
      }
    }
    if (bestColor < 0) break;
    current = applyMove(current, size, bestColor);
    moves++;
  }
  return moves;
}
