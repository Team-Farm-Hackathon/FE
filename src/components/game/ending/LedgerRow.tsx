export default function LedgerRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-sm border border-[#3d2818] bg-[#1a1108]/60 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <span className="text-xs tracking-widest text-[#a88a5a]">{label}</span>
      </div>
      <span
        className="text-lg tracking-wider"
        style={{ color: accent ?? "#e8b86b" }}
      >
        {value}
      </span>
    </div>
  );
}