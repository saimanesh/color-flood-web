/** Row of color buttons the player taps to flood. */
export default function ColorPicker({
  colors,
  palette,
  disabled,
  onPick,
}: {
  colors: number;
  palette: string[];
  disabled?: boolean;
  onPick: (c: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {Array.from({ length: colors }, (_, c) => (
        <button
          key={c}
          disabled={disabled}
          onClick={() => onPick(c)}
          className="cf-press relative rounded-2xl shadow-lg disabled:opacity-40 disabled:grayscale"
          style={{
            width: 52,
            height: 52,
            backgroundColor: palette[c],
            boxShadow: `0 4px 12px ${palette[c]}66, inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.2)`,
            border: '2px solid rgba(255,255,255,0.5)',
          }}
          aria-label={`Flood color ${c + 1}`}
        />
      ))}
    </div>
  );
}
