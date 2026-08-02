import { Star } from 'lucide-react';

export default function StarRating({ stars, size = 24 }: { stars: number; size?: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[1, 2, 3].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/25 fill-white/10'}
          style={n <= stars ? { animation: `cf-bounce-in 0.4s ${n * 0.12}s both` } : undefined}
        />
      ))}
    </div>
  );
}
