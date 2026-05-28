export default function ChoiceBadge({ isCoop }: { isCoop: boolean }) {
  return (
    <div
      className={`flex h-5 items-center gap-1 border border-[#1a1108] px-2 ${
        isCoop ? "bg-[#4a7a3a]" : "bg-[#8a2a1a]"
      }`}
    >
      <span className="text-[10px] text-[#f5e6c8]">{isCoop ? "🤝" : "🗡"}</span>
      <span className="text-[9px] tracking-widest text-[#f5e6c8]">
        {isCoop ? "협력" : "배신"}
      </span>
    </div>
  );
}
