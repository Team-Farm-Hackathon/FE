import { AnimatePresence, motion } from "motion/react";

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
            <motion.span
              key={i}
              animate={{
                backgroundColor: i <= introIdx ? "#3d2818" : "#c9b48a",
                scale: i === introIdx ? 1.25 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="h-2 w-2 rounded-full"
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={introIdx}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-sm leading-relaxed text-[#3d2818] md:text-base"
          >
            "{intro[introIdx]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 2 }}
        className="mt-4 w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] hover:bg-[#e8b86b] md:py-5 md:text-base"
      >
        {isLast ? "거 래 시 작 ▶" : "계 속 ▶"}
      </motion.button>
    </>
  );
}
