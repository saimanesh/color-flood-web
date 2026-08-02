import { WorldTheme } from '../game/types';

/** Cell shape classes per world theme. */
export function cellClass(shape: WorldTheme['cellShape']): string {
  switch (shape) {
    case 'pebble':
      return 'rounded-[40%]';
    case 'neon':
      return 'rounded-md';
    case 'leaf':
      return 'rounded-tl-[60%] rounded-br-[60%] rounded-tr-lg rounded-bl-lg';
    case 'candy':
      return 'rounded-full';
    case 'planet':
      return 'rounded-full';
    case 'shimmer':
      return 'rounded-lg';
    case 'ice':
      return 'rounded-md';
    case 'lava':
      return 'rounded-lg';
    case 'blossom':
      return 'rounded-full';
    case 'gold':
      return 'rounded-xl';
    default:
      return 'rounded-lg';
  }
}

/** Extra inline style per shape (glows, etc). Adds a dark outline so each
 *  colored block reads as distinct against the black background. */
export function cellStyle(shape: WorldTheme['cellShape'], color: string): React.CSSProperties {
  const outline: React.CSSProperties = {
    border: '1px solid rgba(0,0,0,0.45)',
  };
  switch (shape) {
    case 'neon':
      return { ...outline, boxShadow: `0 0 8px ${color}, inset 0 0 6px rgba(255,255,255,0.4)` };
    case 'planet':
      return { ...outline, boxShadow: `0 0 10px ${color}aa, inset -3px -3px 6px rgba(0,0,0,0.4)` };
    case 'ice':
      return { boxShadow: `inset 0 0 4px rgba(255,255,255,0.8)`, border: '1px solid rgba(255,255,255,0.4)' };
    case 'lava':
      return { ...outline, boxShadow: `0 0 8px ${color}, inset 0 0 6px rgba(0,0,0,0.3)` };
    case 'gold':
      return { ...outline, boxShadow: `0 0 6px ${color}, inset 0 0 4px rgba(255,255,255,0.3)` };
    case 'candy':
      return { ...outline, boxShadow: `inset 0 -3px 4px rgba(0,0,0,0.15), inset 0 3px 4px rgba(255,255,255,0.4)` };
    case 'pebble':
      return { ...outline, boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 2px 3px rgba(255,255,255,0.3)` };
    case 'shimmer':
      return { ...outline, boxShadow: `inset 0 2px 3px rgba(255,255,255,0.25)` };
    case 'leaf':
      return { ...outline, boxShadow: `inset 0 2px 3px rgba(255,255,255,0.2)` };
    case 'blossom':
      return { ...outline, boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.35)` };
    default:
      return outline;
  }
}
