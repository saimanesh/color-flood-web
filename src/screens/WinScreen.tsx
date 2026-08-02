import { WorldTheme } from '../game/types';
import StarRating from '../components/StarRating';
import { useMemo } from 'react';
import { RotateCcw, ChevronRight } from 'lucide-react';

export default function WinScreen({
  theme,
  level,
  moves,
  maxMoves,
  stars,
  hasNext,
  onNext,
  onRetry,
  onMenu,
}: {
  theme: WorldTheme;
  level: number;
  moves: number;
  maxMoves: number;
  stars: number;
  hasNext: boolean;
  onNext: () => void;
  onRetry: () => void;
  onMenu: () => void;
}) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: Math.random() * 1.5 + 1.8,
        color: theme.palette[Math.floor(Math.random() * theme.palette.length)],
        size: Math.random() * 8 + 6,
        rot: Math.random() * 360,
      })),
    [theme],
  );

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-black">
      {/* confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 0.5,
              background: c.color,
              transform: `rotate(${c.rot}deg)`,
              animation: `cf-confetti-fall ${c.dur}s linear ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center cf-scale-in">
        <div className="text-5xl mb-2">{theme.emoji}</div>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-1">Level Complete!</h1>
        <p className="text-white/80 font-semibold mb-6">Level {level} · {theme.name}</p>

        <div className="mb-6">
          <StarRating stars={stars} size={56} />
        </div>

        <div className="text-white/90 font-semibold mb-8">
          Solved in <span className="text-white font-bold">{moves}</span> / {maxMoves} moves
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          {hasNext && (
            <button
              onClick={onNext}
              className="cf-press w-full py-3.5 rounded-2xl bg-white text-neutral-900 font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              Next Level <ChevronRight size={22} />
            </button>
          )}
          <button
            onClick={onRetry}
            className="cf-press w-full py-3.5 rounded-2xl bg-white/20 text-white font-bold text-lg flex items-center justify-center gap-2 border border-white/30"
          >
            <RotateCcw size={20} /> Retry
          </button>
          <button
            onClick={onMenu}
            className="cf-press w-full py-3 rounded-2xl bg-white/10 text-white/80 font-semibold"
          >
            World Map
          </button>
        </div>
      </div>
    </div>
  );
}
