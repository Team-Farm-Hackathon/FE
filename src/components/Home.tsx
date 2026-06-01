import { motion } from "motion/react";
import Header from "./common/Header";
import { Player } from "../assets";
import { useGameStore } from "../store/useGameStore";
import { STAGES } from "../game/stages";
import { HOW_TO_PLAY } from "../game/play";

const TOTAL_STAGES = STAGES.length;



export default function Home() {
  const setScreen = useGameStore((s) => s.setScreen);
  const reset = useGameStore((s) => s.reset);
  const currentStage = useGameStore((s) => s.currentStage);

  const reputation = useGameStore((s) => s.reputation);
  const coopCount = useGameStore((s) => s.coopCount);
  const defectCount = useGameStore((s) => s.defectCount);
  const guessCorrect = useGameStore((s) => s.guessCorrect);

  const stage =
    STAGES.find((s) => s.id === currentStage) ?? STAGES[STAGES.length - 1];
  const totalRounds = coopCount + defectCount;
  const coopRate =
    totalRounds > 0 ? Math.round((coopCount / totalRounds) * 100) : 0;
  const defectRate = totalRounds > 0 ? 100 - coopRate : 0;

  const onContinue = () => setScreen("playing");
  const onRestart = () => {
    reset();
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6">
        {/* 이어하기 */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative min-h-72 overflow-hidden rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10"
        >
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            이어 하기 · STAGE {currentStage} / {TOTAL_STAGES}
          </p>
          <h2 className="mt-3 text-2xl text-[#e8b86b] md:text-3xl">
            {stage.name}
          </h2>
          <p className="mt-3 max-w-[60%] text-xs leading-relaxed text-[#a88a5a] md:max-w-xs md:text-sm">
            {stage.areaLabel}의 거래. 라운드 1 / {stage.rounds}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8 md:gap-3">
            <button
              onClick={onContinue}
              className="border-2 border-[#1a1108] bg-[#6a8a4a] px-4 py-2 text-xs tracking-widest text-[#1a1108] transition-transform hover:bg-[#7a9a5a] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 md:px-6 md:py-3 md:text-sm"
            >
              여 정 잇 기
            </button>
            <button
              onClick={onRestart}
              className="border border-[#5a4a2a] px-4 py-2 text-xs text-[#c89a5a] transition-colors hover:border-[#e8b86b] hover:text-[#e8b86b] md:px-5 md:py-3 md:text-sm"
            >
              초기화
            </button>
          </div>

          <motion.img
            src={Player}
            alt="player"
            initial={{ opacity: 0, x: 30, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="absolute right-4 bottom-4 size-28 rounded-md bg-[#1a1208]/40 object-contain p-2 md:right-6 md:bottom-6 md:size-40 lg:right-8 lg:bottom-8 lg:size-50"
          />
        </motion.section>

        {/* 나의 평판 */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
          className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10"
        >
          <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
            나의 평판
          </p>
          <p className="mt-3 text-4xl text-[#e8b86b] md:text-5xl">
            {reputation}
          </p>
          <p className="mt-2 text-xs text-[#a88a5a] md:text-sm">
            {reputation >= 70
              ? "믿을 만한 자라 불리기 시작했다."
              : reputation >= 40
                ? "이름이 조금씩 알려지고 있다."
                : "신뢰를 잃어가고 있다."}
          </p>

          <hr className="my-4 border-[#3a2a1c] md:my-5" />

          <div className="grid grid-cols-2 gap-y-4 md:gap-y-5">
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                협력률
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {coopRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                배신률
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {defectRate}%
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                총 라운드
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {totalRounds}회
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
                정체 적중
              </p>
              <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">
                {guessCorrect}회
              </p>
            </div>
          </div>
        </motion.section>

        {/* 상인의 일지: 스토리 + 게임 방법 */}
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
              CHAPTER · {currentStage} / {TOTAL_STAGES}
            </span>
          </div>

          {/* 스토리 */}
          <div className="relative border-l-2 border-[#5a4a2a] pl-4 md:pl-5">
            <p className="text-sm leading-relaxed text-[#d9c9a8] italic md:text-base">
              어둠이 짙어진 중세의 교역로. 항구와 시장, 길드의 회랑마다
              <span className="text-[#e8b86b]"> 거래</span>가 오갔고 그 뒤엔
              언제나 <span className="text-[#e8b86b]">선택</span>이 있었다.
              누군가는 약속을 지켰고, 누군가는 등을 돌렸다.
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
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.3 + idx * 0.1,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
                className="flex flex-col rounded-md border border-[#3a2a1c] bg-[#1a1208] p-4 md:p-5"
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    initial={{ rotate: -20, scale: 0.7 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      delay: 0.45 + idx * 0.1,
                      duration: 0.45,
                      ease: "backOut",
                    }}
                    className="text-2xl md:text-3xl"
                  >
                    {item.icon}
                  </motion.span>
                  <p className="text-sm text-[#e8b86b] md:text-base">
                    {item.title}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#a88a5a] md:text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}
