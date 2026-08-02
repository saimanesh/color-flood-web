// ===== Seeded RNG (mulberry32) =====
// Deterministic per seed so a given level number always yields the same grid.

export function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return function rng(): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) - Math.imul(t ^ (t >>> 14), 5);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Int in [0, n) */
export function randInt(rng: () => number, n: number): number {
  return Math.floor(rng() * n);
}
