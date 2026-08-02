import { useState } from 'react';
import { X, Check, Ban, Plus, Unlock } from 'lucide-react';
import { ProgressState } from '../game/types';
import { LEVELS_PER_WORLD, TOTAL_LEVELS } from '../game/levelGenerator';

interface ShopItem {
  id: string;
  title: string;
  price: number;
  desc: string;
  icon: 'ban' | 'plus' | 'unlock';
}

const ITEMS: ShopItem[] = [
  { id: 'remove-ads', title: 'Remove Ads Forever', price: 99, desc: 'Hide all ad placeholders permanently.', icon: 'ban' },
  { id: 'extra-moves', title: '5 Extra Moves Pack', price: 10, desc: 'Add 5 moves to your current level.', icon: 'plus' },
  { id: 'unlock-world', title: 'Unlock Next World', price: 20, desc: 'Unlock the next world early.', icon: 'unlock' },
];

export default function Shop({
  progress,
  onClose,
  onBuy,
}: {
  progress: ProgressState;
  onClose: () => void;
  onBuy: (itemId: string) => void;
}) {
  const [confirm, setConfirm] = useState<string | null>(null);

  const handleBuy = (id: string) => {
    onBuy(id);
    setConfirm(id);
    setTimeout(() => setConfirm(null), 2200);
  };

  const nextWorldStart = Math.ceil(progress.unlocked / LEVELS_PER_WORLD) * LEVELS_PER_WORLD + 1;
  const canUnlockNext = nextWorldStart <= TOTAL_LEVELS;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="flex items-center justify-between px-4 py-3 cf-safe-top">
        <h1 className="text-2xl font-bold text-white">Shop</h1>
        <button onClick={onClose} className="cf-press p-2 rounded-full bg-white/10 text-white">
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 space-y-4">
        {ITEMS.map((item) => {
          const disabled =
            (item.id === 'remove-ads' && progress.adsRemoved) ||
            (item.id === 'unlock-world' && !canUnlockNext);
          const Icon = item.icon === 'ban' ? Ban : item.icon === 'plus' ? Plus : Unlock;
          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white/10 border border-white/15 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-300">₹{item.price}</span>
                {confirm === item.id ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold cf-pop">
                    <Check size={20} /> Purchase Successful!
                  </div>
                ) : (
                  <button
                    disabled={disabled}
                    onClick={() => handleBuy(item.id)}
                    className="cf-press px-6 py-2.5 rounded-full bg-white text-neutral-900 font-bold disabled:opacity-40"
                  >
                    {disabled ? 'Owned' : 'Buy'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
        <p className="text-center text-white/40 text-xs pt-2">
          Simulated purchases — real payments arrive when wrapped as a native app.
        </p>
      </div>
    </div>
  );
}
