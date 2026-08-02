import { useState, useEffect } from 'react';

/** Fixed bottom banner ad placeholder. Hidden when ads removed. */
export function BannerAd({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 h-14 bg-neutral-800/95 border-t border-white/10 flex items-center justify-center text-white/50 text-sm font-medium cf-safe-bottom">
      Ad Banner Placeholder
    </div>
  );
}

/** Full-screen interstitial overlay with countdown. */
export function InterstitialAd({
  open,
  onContinue,
}: {
  open: boolean;
  onContinue: () => void;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (open) setActive(true);
  }, [open]);
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (!active) return;
    setCount(5);
  }, [active]);
  useEffect(() => {
    if (!active || count <= 0) return;
    const t = setTimeout(() => setCount((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [active, count]);
  if (!active) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-center p-6">
      <div className="text-white/40 text-sm tracking-widest uppercase mb-2">Sponsored</div>
      <div className="text-5xl font-bold text-white/80 mb-8">Advertisement</div>
      <div className="w-full max-w-sm h-48 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white/30">
        Ad creative placeholder
      </div>
      <button
        onClick={() => {
          setActive(false);
          onContinue();
        }}
        disabled={count > 0}
        className="mt-8 px-8 py-3 rounded-full bg-white text-neutral-900 font-bold cf-press disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {count > 0 ? `Continue in ${count}s` : 'Continue'}
      </button>
    </div>
  );
}

/** Rewarded ad overlay (5s "Watching Ad...") then callback. */
export function RewardedAd({
  open,
  onComplete,
  onCancel,
}: {
  open: boolean;
  onComplete: () => void;
  onCancel: () => void;
}) {
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (!open) {
      setCount(5);
      return;
    }
  }, [open]);
  useEffect(() => {
    if (!open || count <= 0) return;
    const t = setTimeout(() => setCount((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [open, count]);
  useEffect(() => {
    if (open && count === 0) onComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, count]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-center p-6">
      <div className="text-white/40 text-sm tracking-widest uppercase mb-2">Rewarded Ad</div>
      <div className="text-3xl font-bold text-white/80 mb-6">Watching Ad...</div>
      <div className="w-full max-w-sm h-40 rounded-2xl bg-gradient-to-br from-amber-700 to-rose-900 flex items-center justify-center text-white/40">
        Ad creative placeholder
      </div>
      <div className="mt-6 text-white/60 text-lg font-semibold">{count}s</div>
      <button onClick={onCancel} className="mt-4 text-white/40 text-sm underline">
        Cancel
      </button>
    </div>
  );
}
