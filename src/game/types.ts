// ===== Types =====

export type Screen =
  | 'home'
  | 'world-map'
  | 'level-select'
  | 'game'
  | 'win'
  | 'lose'
  | 'shop'
  | 'settings';

export interface LevelData {
  level: number;
  world: number;
  size: number;
  colors: number;
  grid: number[]; // flat row-major, values 0..colors-1
  maxMoves: number;
}

export interface WorldTheme {
  id: number;
  name: string;
  emoji: string;
  /** Tailwind gradient classes for the background */
  bg: string;
  /** Accent text color class */
  accent: string;
  /** Base palette of hex colors (6 entries; first `colors` used per level) */
  palette: string[];
  /** Colorblind-friendly alternate palette */
  cbPalette: string[];
  /** Cell shape style */
  cellShape: 'pebble' | 'neon' | 'leaf' | 'candy' | 'planet' | 'shimmer' | 'ice' | 'lava' | 'blossom' | 'gold';
  /** Background effect kind */
  effect: 'none' | 'starfield' | 'petals' | 'shimmer' | 'lava' | 'frost';
}

export interface ProgressState {
  /** highest unlocked level number (1-based) */
  unlocked: number;
  /** map level -> stars earned (1..3) */
  stars: Record<number, number>;
  adsRemoved: boolean;
  colorblind: boolean;
}
