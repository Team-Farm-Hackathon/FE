import { motion } from "motion/react";

export default function HowToPlayItem({
  icon,
  title,
  desc,
  index,
}: {
  icon: string;
  title: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + index * 0.1,
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
            delay: 0.45 + index * 0.1,
            duration: 0.45,
            ease: "backOut",
          }}
          className="text-2xl md:text-3xl"
        >
          {icon}
        </motion.span>
        <p className="text-sm text-[#e8b86b] md:text-base">{title}</p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#a88a5a] md:text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
