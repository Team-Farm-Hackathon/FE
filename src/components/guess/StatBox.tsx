export default function StatBox({
  label,
  value,
  accent,
  icon,
}: {
  label: string;
  value: number | string;
  accent: string;
  icon: string;
}) {
  return (
    <div className="rounded-sm border border-[#3d2818] bg-[#1a1108] p-2">
      <p className="text-[9px] tracking-widest text-[#8a6a3d]">{label}</p>
      <p
        className="mt-1 flex items-center gap-1 text-base"
        style={{ color: accent }}
      >
        <span className="text-xs">{icon}</span>
        <span className="tracking-wider">{value}</span>
      </p>
    </div>
  );
}
