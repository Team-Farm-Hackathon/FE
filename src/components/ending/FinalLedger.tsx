import { motion } from "motion/react";
import LedgerRow from "./LedgerRow";

export default function FinalLedger({
  gold,
  reputation,
  coopRate,
  defectCount,
  guessCorrect,
  guessAttempts,
}: {
  gold: number;
  reputation: number;
  coopRate: number;
  defectCount: number;
  guessCorrect: number;
  guessAttempts: number;
}) {
  const rows = [
    { icon: "🪙", label: "최종 골드", value: `${gold}`, accent: undefined },
    { icon: "⭐", label: "평판", value: `${reputation} / 100`, accent: undefined },
    { icon: "🤝", label: "협력률", value: `${coopRate}%`, accent: "#8fbe70" },
    { icon: "🗡", label: "배신 횟수", value: `${defectCount}`, accent: "#e87560" },
    {
      icon: "🎯",
      label: "추리 적중",
      value: `${guessCorrect}/${guessAttempts}`,
      accent: undefined,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="flex w-full flex-col rounded-md border border-[#3d2818] bg-[#0a0805]/80 p-5 backdrop-blur-sm md:w-80"
    >
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">
        + FINAL LEDGER +
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {rows.map((row, idx) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
          >
            <LedgerRow
              icon={row.icon}
              label={row.label}
              value={row.value}
              accent={row.accent}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
