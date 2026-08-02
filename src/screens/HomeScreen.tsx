import { TOTAL_LEVELS, LEVELS_PER_WORLD } from '../game/levelGenerator';
import { ProgressState } from '../game/types';
import { Star } from 'lucide-react';

export default function HomeScreen({
  progress,
  onPlay,
  onShop,
  onSettings,
  onHowTo,
}: {
  progress: ProgressState;
  onPlay: () => void;
  onShop: () => void;
  onSettings: () => void;
  onHowTo: () => void;
}) {
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
  const maxStars = TOTAL_LEVELS * 3;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-black">

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="text-6xl mb-2 drop-shadow-lg">🎨</div>
        <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-xl tracking-tight">
          Color Flood
        </h1>
        <p className="text-white/80 font-semibold text-lg mt-1 mb-8">Puzzle Adventure</p>

        <button
          onClick={onPlay}
          className="cf-press w-64 py-4 rounded-full bg-white text-neutral-900 font-bold text-2xl shadow-2xl mb-4"
        >
          Play
        </button>
        <div className="flex gap-3">
          <button
            onClick={onShop}
            className="cf-press px-6 py-3 rounded-full bg-white/20 text-white font-semibold border border-white/30"
          >
            Shop
          </button>
          <button
            onClick={onSettings}
            className="cf-press px-6 py-3 rounded-full bg-white/20 text-white font-semibold border border-white/30"
          >
            Settings
          </button>
          <button
            onClick={onHowTo}
            className="cf-press px-6 py-3 rounded-full bg-white/20 text-white font-semibold border border-white/30"
          >
            How to Play
          </button>
        </div>

        <div className="mt-10 flex items-center gap-1.5 text-white/90">
          <Star size={18} className="text-yellow-300 fill-yellow-300" />
          <span className="font-bold">{totalStars}</span>
          <span className="text-white/60 text-sm">/ {maxStars} stars</span>
        </div>
        <p className="mt-2 text-white/70 text-sm">
          {LEVELS_PER_WORLD} worlds · {TOTAL_LEVELS} levels
        </p>
      </div>
    </div>
  );
}
