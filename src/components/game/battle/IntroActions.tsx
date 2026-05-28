export default function IntroActions({
  intro,
  introIdx,
  onNext,
}: {
  intro: string[];
  introIdx: number;
  onNext: () => void;
}) {
  const isLast = introIdx >= intro.length - 1;

  return (
    <>
      <div className="mt-6 rounded-md border border-[#c9b48a] bg-[#f5e6c8] p-4">
        <div className="mb-3 flex gap-1">
          {intro.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                i <= introIdx ? "bg-[#3d2818]" : "bg-[#c9b48a]"
              }`}
            />
          ))}
        </div>
        <p
          key={introIdx}
          className="animate-slide-in-right text-sm leading-relaxed text-[#3d2818] md:text-base"
        >
          "{intro[introIdx]}"
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-4 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 md:py-5 md:text-base"
      >
        {isLast ? "거 래 시 작 ▶" : "계 속 ▶"}
      </button>
    </>
  );
}
