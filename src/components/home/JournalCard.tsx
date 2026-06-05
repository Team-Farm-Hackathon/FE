import { motion } from "motion/react";
import { HOW_TO_PLAY } from "../../constants/play";
import HowToPlayItem from "./HowToPlayItem";

export default function JournalCard({
  currentStage,
  totalStages,
}: {
  currentStage: number;
  totalStages: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:col-span-2 md:p-8"
    >
      {/* 양피지 질감 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #e8b86b 0, transparent 40%), radial-gradient(circle at 80% 70%, #e8b86b 0, transparent 40%)",
        }}
      />

      <div className="relative mb-5 flex items-end justify-between md:mb-6">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            상 인 의 일 지
          </p>
          <h3 className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
            The Merchant's Journal
          </h3>
        </div>
        <span className="hidden text-[10px] tracking-[0.3em] text-[#6a4e2d] md:inline md:text-xs">
          CHAPTER · {currentStage} / {totalStages}
        </span>
      </div>

      {/* 스토리 */}
      <div className="relative border-l-2 border-[#5a4a2a] pl-4 md:pl-5">
        <p className="text-sm leading-relaxed text-[#d9c9a8] italic md:text-base">
          어둠이 짙어진 중세의 교역로. 항구와 시장, 길드의 회랑마다
          <span className="text-[#e8b86b]"> 거래</span>가 오갔고 그 뒤엔 언제나{" "}
          <span className="text-[#e8b86b]">선택</span>이 있었다. 누군가는
          약속을 지켰고, 누군가는 등을 돌렸다.
          <br className="hidden md:block" />
          당신은 이제 막 길드의 인장을 받은 떠돌이 상인. 협력과 배신 사이,
          어떤 이름으로 기억될 것인가?
        </p>
      </div>

      <div className="my-6 flex items-center gap-3 md:my-7">
        <div className="h-px flex-1 bg-[#3a2a1c]" />
        <span className="text-[10px] tracking-[0.4em] text-[#6a4e2d]">
          + 거 래 의 규 칙 +
        </span>
        <div className="h-px flex-1 bg-[#3a2a1c]" />
      </div>

      {/* 게임 방법 */}
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {HOW_TO_PLAY.map((item, idx) => (
          <HowToPlayItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            index={idx}
          />
        ))}
      </div>
    </motion.section>
  );
}
