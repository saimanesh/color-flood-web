import { WorldTheme, ProgressState } from '../game/types';
import { LEVELS_PER_WORLD } from '../game/levelGenerator';
import StarRating from '../components/StarRating';
import { Star } from 'lucide-react';

/** Grid of 20 level nodes within a world. */
export default function LevelSelect({
  world,
  worldId,
  progress,
  onSelect,
  onBack,
}: {
  world: WorldTheme;
  worldId: number;
  progress: ProgressState;
  onSelect: (level: number) => void;
  onBack: () => void;
}) {
  const start = (worldId - 1) * LEVELS_PER_WORLD + 1;
  const levels = Array.from({ length: LEVELS_PER_WORLD }, (_, i) => start + i);

  return (
    <div className="relative min-h-screen w-full overflow-y-auto pb-28">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-md cf-safe-top">
        <button onClick={onBack} className="cf-press px-4 py-2 rounded-full bg-white/15 text-white font-semibold text-sm">
          ← Worlds
        </button>
        <h1 className="text-xl font-bold text-white drop-shadow flex items-center gap-2">
          <span>{world.emoji}</span> {world.name}
        </h1>
        <div className="w-16" />
      </div>

      <div className="mx-auto max-w-md px-4 py-6">
        <div className="grid grid-cols-4 gap-3">
          {levels.map((lvl) => {
            const unlocked = progress.unlocked >= lvl;
            const stars = progress.stars[lvl] ?? 0;
            return (
              <button
                key={lvl}
                disabled={!unlocked}
                onClick={() => onSelect(lvl)}
                className={`cf-press relative aspect-square rounded-2xl flex flex-col items-center justify-center border-2 ${
                  unlocked
                    ? 'bg-white/15 border-white/30'
                    : 'bg-white/5 border-white/10 grayscale opacity-50'
                }`}
              >
                {unlocked ? (
                  <>
                    <span className="text-white font-bold text-lg drop-shadow">{lvl - start + 1}</span>
                    {stars > 0 ? (
                      <div className="scale-75 mt-0.5">
                        <StarRating stars={stars} size={12} />
                      </div>
                    ) : (
                      <Star size={12} className="text-white/30 mt-0.5" />
                    )}
                  </>
                ) : (
                  <span className="text-xl">🔒</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
