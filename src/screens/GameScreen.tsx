import { useState, useMemo, useCallback } from 'react';
import { LevelData, ProgressState, WorldTheme } from '../game/types';
import { connectedRegion, applyMove, isSolved } from '../game/floodfill';
import { computeStars } from '../game/storage';
import GameBoard from '../components/GameBoard';
import ColorPicker from '../components/ColorPicker';
import { ShoppingBag, Home, RotateCcw } from 'lucide-react';

export default function GameScreen({
  level,
  theme,
  palette,
  progress,
  onWin,
  onLose,
  onExit,
  onShop,
  extraMoves,
}: {
  level: LevelData;
  theme: WorldTheme;
  palette: string[];
  progress: ProgressState;
  onWin: (movesUsed: number, stars: number) => void;
  onLose: () => void;
  onExit: () => void;
  onShop: () => void;
  extraMoves: number;
}) {
  void progress;
  const [grid, setGrid] = useState<number[]>(() => level.grid.slice());
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);

  const maxMoves = level.maxMoves + extraMoves;
  const remaining = maxMoves - moves;
  const region = useMemo(() => connectedRegion(grid, level.size), [grid, level.size]);

  const handlePick = useCallback(
    (c: number) => {
      if (busy) return;
      if (c === grid[0]) return;
      setBusy(true);
      // Defer to next tick so CSS transition triggers on changed cells.
      setTimeout(() => {
        const next = applyMove(grid, level.size, c);
        const used = moves + 1;
        setGrid(next);
        setMoves(used);
        setBusy(false);
        if (isSolved(next)) {
          onWin(used, computeStars(used, level.maxMoves));
        } else if (used >= maxMoves) {
          onLose();
        }
      }, 30);
    },
    [busy, grid, level.size, moves, maxMoves, onWin, onLose]
  );

  const reset = useCallback(() => {
    setGrid(level.grid.slice());
    setMoves(0);
  }, [level.grid]);

  // Move bar color: green -> yellow -> red.
  const pct = Math.max(0, Math.min(1, remaining / maxMoves));
  const barColor =
    pct > 0.5 ? 'bg-emerald-400' : pct > 0.25 ? 'bg-yellow-400' : 'bg-red-500';

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 cf-safe-top">
        <button onClick={onExit} className="cf-press p-2 rounded-full bg-white/15 text-white">
          <Home size={20} />
        </button>
        <div className="text-white font-bold text-lg drop-shadow">
          Level {level.level}
        </div>
        <button onClick={onShop} className="cf-press p-2 rounded-full bg-white/15 text-white">
          <ShoppingBag size={20} />
        </button>
      </div>

      {/* Moves counter + bar */}
      <div className="px-4 mb-2">
        <div className="flex items-center justify-between text-white text-sm font-semibold mb-1">
          <span>Moves</span>
          <span className={remaining <= 3 ? 'text-red-300' : ''}>
            {moves} / {maxMoves}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-black/30 overflow-hidden">
          <div
            className={`h-full ${barColor} rounded-full transition-all duration-300`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 flex items-center justify-center px-3 py-2">
        <GameBoard
          grid={grid}
          size={level.size}
          theme={theme}
          palette={palette}
          region={region}
        />
      </div>

      {/* Color picker */}
      <div className="px-4 py-4 pb-24">
        <ColorPicker
          colors={level.colors}
          palette={palette}
          disabled={busy}
          onPick={handlePick}
        />
        <button
          onClick={reset}
          className="mt-4 mx-auto flex items-center gap-1.5 text-white/70 text-sm cf-press"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>
    </div>
  );
}
