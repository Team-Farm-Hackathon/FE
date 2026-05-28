import type { Ending } from "../../../types/game";

export default function EndingCard({ ending }: { ending: Ending }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm overflow-hidden rounded-md border-2 border-[#e8b86b] bg-linear-to-b from-[#1a1108] to-[#0a0805] p-10 shadow-[0_0_40px_rgba(232,184,107,0.35)]">
        {/* 코너 장식 */}
        <span className="absolute top-3 left-3 text-xs text-[#e8b86b]">✦</span>
        <span className="absolute top-3 right-3 text-xs text-[#e8b86b]">✦</span>
        <span className="absolute bottom-3 left-3 text-xs text-[#e8b86b]">✦</span>
        <span className="absolute right-3 bottom-3 text-xs text-[#e8b86b]">
          ✦
        </span>

        <div className="flex aspect-square items-center justify-center">
          <span className="text-9xl drop-shadow-[0_0_20px_rgba(232,184,107,0.5)]">
            {ending.icon}
          </span>
        </div>
      </div>

      <p className="mt-6 text-[10px] tracking-[0.4em] text-[#8a6a3d]">
        YOUR PATH
      </p>
      <h1 className="mt-2 text-5xl tracking-wider text-[#e8b86b] drop-shadow-[2px_2px_0_#000] md:text-6xl">
        {ending.name}
      </h1>
      <p className="mt-3 text-sm text-[#a88a5a] italic">{ending.subtitle}</p>
    </div>
  );
}
