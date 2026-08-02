// ===== BFS Flood-Fill =====
// The player controls the top-left cell (index 0). Choosing a color "floods"
// the connected region of same-colored cells (4-neighbour BFS) into the new
// color, then we re-check connectivity — newly-adjacent same-color cells get
// absorbed on the next move. Here we compute the connected region and apply
// the recolor in one step.

/**
 * Compute the set of cell indices connected to cell 0 by same-color adjacency.
 */
export function connectedRegion(grid: number[], size: number): Set<number> {
  const start = 0;
  const target = grid[start];
  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  while (queue.length) {
    const idx = queue.shift()!;
    const r = Math.floor(idx / size);
    const c = idx % size;
    const neighbors = [
      r > 0 ? idx - size : -1,
      r < size - 1 ? idx + size : -1,
      c > 0 ? idx - 1 : -1,
      c < size - 1 ? idx + 1 : -1,
    ];
    for (const n of neighbors) {
      if (n >= 0 && !visited.has(n) && grid[n] === target) {
        visited.add(n);
        queue.push(n);
      }
    }
  }
  return visited;
}

/**
 * Apply a flood move: recolor the connected region of cell 0 to `color`.
 * Returns a NEW grid (does not mutate input). Connectivity is naturally
 * re-evaluated on the next call to connectedRegion.
 */
export function applyMove(grid: number[], size: number, color: number): number[] {
  const region = connectedRegion(grid, size);
  const next = grid.slice();
  for (const idx of region) next[idx] = color;
  return next;
}

/** True when the whole grid is one color. */
export function isSolved(grid: number[]): boolean {
  const c = grid[0];
  for (let i = 1; i < grid.length; i++) if (grid[i] !== c) return false;
  return true;
}
