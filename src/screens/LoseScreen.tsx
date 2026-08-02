import { WorldTheme } from '../game/types';
import { RotateCcw, Play, Home, ShoppingBag } from 'lucide-react';

export default function LoseScreen({
  theme,
  level,
  maxMoves,
  adsRemoved,
  onRetry,
  onMenu,
  onShop,
  onWatchAd,
}: {
  theme: WorldTheme;
  level: number;
  maxMoves: number;
  adsRemoved: boolean;
  onRetry: () => void;
  onMenu: () => void;
  onShop: () => void;
  onWatchAd: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-black">
      <div className="relative text-center cf-scale-in">
        <div className="text-5xl mb-2 grayscale">{theme.emoji}</div>
        <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-1">Out of Moves</h1>
        <p className="text-white/80 font-semibold mb-2">Level {level}</p>
        <p className="text-white/70 mb-8">
          You used all {maxMoves} moves. Try again!
        </p>

        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          {!adsRemoved && (
            <button
              onClick={onWatchAd}
              className="cf-press w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
            >
              <Play size={20} /> Watch Ad for +5 Moves
            </button>
          )}
          <button
            onClick={onRetry}
            className="cf-press w-full py-3.5 rounded-2xl bg-white text-neutral-900 font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw size={20} /> Retry
          </button>
          <button
            onClick={onShop}
            className="cf-press w-full py-3 rounded-2xl bg-white/15 text-white font-semibold flex items-center justify-center gap-2 border border-white/20"
          >
            <ShoppingBag size={18} /> Shop
          </button>
          <button
            onClick={onMenu}
            className="cf-press w-full py-3 rounded-2xl bg-white/10 text-white/80 font-semibold flex items-center justify-center gap-2"
          >
            <Home size={18} /> Menu
          </button>
        </div>
      </div>
    </div>
  );
}
