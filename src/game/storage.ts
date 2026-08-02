// ===== LocalStorage Persistence =====

import { ProgressState } from './types';

const KEY = 'colorflood_progress_v1';

const DEFAULT: ProgressState = {
  unlocked: 1,
  stars: {},
  adsRemoved: false,
  colorblind: false,
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      unlocked: parsed.unlocked ?? 1,
      stars: parsed.stars ?? {},
      adsRemoved: !!parsed.adsRemoved,
      colorblind: !!parsed.colorblind,
    };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(p: ProgressState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

/** Stars awarded for a win based on moves used vs max. */
export function computeStars(movesUsed: number, maxMoves: number): number {
  if (movesUsed <= maxMoves * 0.7) return 3;
  if (movesUsed <= maxMoves * 0.9) return 2;
  return 1;
}
