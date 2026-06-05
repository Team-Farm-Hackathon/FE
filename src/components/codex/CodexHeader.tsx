export default function CodexHeader({
  endingsUnlocked,
  endingsTotal,
  npcsUnlocked,
  npcsTotal,
}: {
  endingsUnlocked: number;
  endingsTotal: number;
  npcsUnlocked: number;
  npcsTotal: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#3a2a1c] bg-linear-to-br from-[#2a1d11] to-[#1a1208] p-6 md:p-8">
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d] md:text-xs">
        COLLECTION · 도감
      </p>
      <h1 className="mt-3 text-3xl text-[#e8b86b] md:text-4xl">상인의 기록</h1>
      <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#a88a5a] md:text-sm">
        거래의 흔적은 사라지지 않는다. 마주친 자들과 걸어온 길이 이곳에 쌓인다.
      </p>

      <div className="mt-5 flex flex-wrap gap-4 text-[10px] tracking-[0.3em] text-[#8a6a3d] md:mt-6 md:gap-8 md:text-xs">
        <span>
          ENDINGS · {endingsUnlocked} / {endingsTotal}
        </span>
        <span>
          NPC · {npcsUnlocked} / {npcsTotal}
        </span>
      </div>
    </div>
  );
}
