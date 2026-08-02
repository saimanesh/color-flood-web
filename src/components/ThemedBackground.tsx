import { useMemo } from 'react';
import { WorldTheme } from '../game/types';

/** Themed animated background per world. */
export default function ThemedBackground({ theme }: { theme: WorldTheme }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        dur: Math.random() * 2 + 2,
      })),
    [],
  );
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: Math.random() * 8 + 10,
        size: Math.random() * 10 + 8,
        hue: Math.random() > 0.5 ? '#fbcfe8' : '#fda4af',
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black" />

      {theme.effect === 'starfield' &&
        stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animation: `cf-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}

      {theme.effect === 'petals' &&
        petals.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-b-full"
            style={{
              left: `${p.left}%`,
              bottom: '-20px',
              width: p.size,
              height: p.size * 1.4,
              background: p.hue,
              opacity: 0.8,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              animation: `cf-float-up ${p.dur}s linear ${p.delay}s infinite`,
            }}
          />
        ))}

      {theme.effect === 'shimmer' && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'cf-shimmer 4s linear infinite',
          }}
        />
      )}

      {theme.effect === 'lava' && (
        <div className="absolute inset-0 opacity-40" style={{ animation: 'cf-pulse-glow 3s ease-in-out infinite', background: 'radial-gradient(circle at 50% 120%, rgba(234,88,12,0.5), transparent 60%)' }} />
      )}

      {theme.effect === 'frost' && (
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 40%), radial-gradient(circle at 70% 70%, rgba(186,230,253,0.5), transparent 40%)' }} />
      )}
    </div>
  );
}
