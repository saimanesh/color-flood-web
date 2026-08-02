import { WorldTheme } from '../game/types';
import { cellClass, cellStyle } from './cellStyles';

/**
 * Renders the flood-it grid. Cells transition smoothly via CSS (cf-cell).
 * The connected region of cell 0 is subtly highlighted.
 */
export default function GameBoard({
  grid,
  size,
  theme,
  palette,
  region,
}: {
  grid: number[];
  size: number;
  theme: WorldTheme;
  palette: string[];
  region: Set<number>;
}) {
  const shapeCls = cellClass(theme.cellShape);
  // Use a fixed max board size and scale cells with CSS grid.
  return (
    <div
      className="grid w-full mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gap: size > 14 ? '2px' : '3px',
        maxWidth: 'min(92vw, 520px)',
        aspectRatio: '1 / 1',
      }}
    >
      {grid.map((c, idx) => {
        const inRegion = region.has(idx);
        return (
          <div
            key={idx}
            className={`cf-cell ${shapeCls} ${inRegion ? 'ring-2 ring-white/70' : ''}`}
            style={{
              backgroundColor: palette[c] ?? '#888',
              ...cellStyle(theme.cellShape, palette[c] ?? '#888'),
            }}
          />
        );
      })}
    </div>
  );
}
