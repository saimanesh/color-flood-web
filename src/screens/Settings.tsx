import { useState } from 'react';
import { X, Trash2, Eye } from 'lucide-react';
import { ProgressState } from '../game/types';

export default function Settings({
  progress,
  onClose,
  onReset,
  onToggleColorblind,
}: {
  progress: ProgressState;
  onClose: () => void;
  onReset: () => void;
  onToggleColorblind: (v: boolean) => void;
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex items-center justify-between px-4 py-3 cf-safe-top">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <button onClick={onClose} className="cf-press p-2 rounded-full bg-white/10 text-white">
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28 space-y-4">
        <div className="rounded-3xl bg-white/10 border border-white/15 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-white">
              <Eye size={22} />
            </div>
            <div>
              <h3 className="text-white font-bold">Colorblind Palette</h3>
              <p className="text-white/60 text-sm">Use higher-contrast colors.</p>
            </div>
          </div>
          <button
            onClick={() => onToggleColorblind(!progress.colorblind)}
            className={`cf-press relative w-14 h-8 rounded-full transition-colors ${
              progress.colorblind ? 'bg-emerald-400' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                progress.colorblind ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="rounded-3xl bg-white/10 border border-white/15 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-2xl bg-red-500/30 flex items-center justify-center text-red-300">
              <Trash2 size={22} />
            </div>
            <div>
              <h3 className="text-white font-bold">Reset Progress</h3>
              <p className="text-white/60 text-sm">Erase all stars and unlocked levels.</p>
            </div>
          </div>
          {confirmReset ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
                className="cf-press flex-1 py-2.5 rounded-full bg-red-500 text-white font-bold"
              >
                Yes, reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="cf-press flex-1 py-2.5 rounded-full bg-white/15 text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="cf-press w-full py-2.5 rounded-full bg-red-500/20 text-red-300 font-semibold border border-red-500/30"
            >
              Reset Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
