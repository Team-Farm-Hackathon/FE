import { motion } from "motion/react";

function reputationLabel(reputation: number): string {
  if (reputation >= 70) return "믿을 만한 자라 불리기 시작했다.";
  if (reputation >= 40) return "이름이 조금씩 알려지고 있다.";
  return "신뢰를 잃어가고 있다.";
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest text-[#6a4e2d] md:text-xs">
        {label}
      </p>
      <p className="mt-1 text-xl text-[#e8b86b] md:text-2xl">{value}</p>
    </div>
  );
}

export default function ReputationCard({
  reputation,
  coopRate,
  defectRate,
  totalRounds,
  guessCorrect,
}: {
  reputation: number;
  coopRate: number;
  defectRate: number;
  totalRounds: number;
  guessCorrect: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      className="rounded-lg border border-[#3a2a1c] bg-[#2a1d11] p-6 md:min-h-90 md:p-8 lg:p-10"
    >
      <p className="text-[10px] tracking-[0.3em] text-[#6a4e2d] md:text-xs">
        나의 평판
      </p>
      <p className="mt-3 text-4xl text-[#e8b86b] md:text-5xl">{reputation}</p>
      <p className="mt-2 text-xs text-[#a88a5a] md:text-sm">
        {reputationLabel(reputation)}
      </p>

      <hr className="my-4 border-[#3a2a1c] md:my-5" />

      <div className="grid grid-cols-2 gap-y-4 md:gap-y-5">
        <Stat label="협력률" value={`${coopRate}%`} />
        <Stat label="배신률" value={`${defectRate}%`} />
        <Stat label="총 라운드" value={`${totalRounds}회`} />
        <Stat label="정체 적중" value={`${guessCorrect}회`} />
      </div>
    </motion.section>
  );
}
