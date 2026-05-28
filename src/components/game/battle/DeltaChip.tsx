export default function DeltaChip({
  kind,
  value,
}: {
  kind: "gold" | "rep";
  value: number;
}) {
  const positive = value >= 0;
  const icon = kind === "gold" ? "🪙" : "⭐";
  const borderColor = positive ? "border-[#4a7a3a]" : "border-[#8a2a1a]";
  const sign = value > 0 ? "+" : "";

  return (
    <div
      className={`flex items-center gap-1 border-2 ${borderColor} bg-[#f5e6c8] px-3 py-1`}
    >
      <span>{icon}</span>
      <span className="text-sm tracking-wider text-[#3d2818]">
        {sign}
        {value}
      </span>
    </div>
  );
}
