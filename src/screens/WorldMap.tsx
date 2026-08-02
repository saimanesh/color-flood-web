import { WORLDS } from '../game/worlds';
import { LEVELS_PER_WORLD } from '../game/levelGenerator';
import { ProgressState } from '../game/types';
import { Star } from 'lucide-react';

/** Trail/path layout of 10 world nodes. */
export default function WorldMap({
  progress,
  onSelect,
  onBack,
}: {
  progress: ProgressState;
  onSelect: (worldId: number) => void;
  onBack: () => void;
}) {
  const starsFor = (worldId: number) => {
    const start = (worldId - 1) * LEVELS_PER_WORLD + 1;
    const end = start + LEVELS_PER_WORLD - 1;
    let total = 0;
    for (let l = start; l <= end; l++) total += progress.stars[l] ?? 0;
    return total;
  };
  const maxStars = LEVELS_PER_WORLD * 3;
  const isUnlocked = (worldId: number) => {
    const firstLevel = (worldId - 1) * LEVELS_PER_WORLD + 1;
    return progress.unlocked >= firstLevel;
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto pb-28">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-md cf-safe-top">
        <button onClick={onBack} className="cf-press px-4 py-2 rounded-full bg-white/15 text-white font-semibold text-sm">
          ← Menu
        </button>
        <h1 className="text-xl font-bold text-white drop-shadow">World Map</h1>
        <div className="w-16" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 py-8 flex flex-col gap-6">
        {WORLDS.map((w, i) => {
          const unlocked = isUnlocked(w.id);
          const stars = starsFor(w.id);
          const offset = i % 2 === 0 ? 'mr-auto' : 'ml-auto';
          return (
            <div key={w.id} className={`w-[80%] ${offset}`}>
              {i < WORLDS.length - 1 && (
                <div className="text-white/30 text-2xl text-center mb-1">↓</div>
              )}
              <button
                disabled={!unlocked}
                onClick={() => onSelect(w.id)}
                className={`cf-press relative w-full rounded-3xl p-5 text-left bg-gradient-to-br ${w.bg} shadow-xl border-2 ${
                  unlocked ? 'border-white/40' : 'border-white/10 grayscale opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl drop-shadow">{w.emoji}</span>
                  <div className="flex-1">
                    <div className="text-white/70 text-xs font-semibold uppercase tracking-wide">
                      World {w.id}
                    </div>
                    <div className="text-2xl font-bold text-white drop-shadow">{w.name}</div>
                  </div>
                  {!unlocked && <span className="text-2xl">🔒</span>}
                </div>
                <div className="mt-3 flex items-center gap-1 text-white/90">
                  <Star size={16} className="text-yellow-300 fill-yellow-300" />
                  <span className="text-sm font-bold">{stars}</span>
                  <span className="text-white/60 text-xs">/ {maxStars}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
