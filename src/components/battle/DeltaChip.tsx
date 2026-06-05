import { motion } from "motion/react";

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
    <motion.div
      animate={{
        boxShadow: positive
          ? [
              "0 0 0 rgba(74,122,58,0)",
              "0 0 16px rgba(74,122,58,0.55)",
              "0 0 0 rgba(74,122,58,0)",
            ]
          : [
              "0 0 0 rgba(138,42,26,0)",
              "0 0 16px rgba(138,42,26,0.6)",
              "0 0 0 rgba(138,42,26,0)",
            ],
      }}
      transition={{ duration: 1.1, repeat: 1 }}
      className={`flex items-center gap-1 border-2 ${borderColor} bg-[#f5e6c8] px-3 py-1`}
    >
      <motion.span
        initial={{ rotate: -20, scale: 0.6 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {icon}
      </motion.span>
      <span className="text-sm tracking-wider text-[#3d2818]">
        {sign}
        {value}
      </span>
    </motion.div>
  );
}
