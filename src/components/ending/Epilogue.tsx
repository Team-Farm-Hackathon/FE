import { motion } from "motion/react";

export default function Epilogue({ message }: { message: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: -28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="flex w-full flex-col rounded-md border border-[#3d2818] bg-[#0a0805]/80 p-5 backdrop-blur-sm md:w-72"
    >
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">EPILOGUE</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="mt-4 text-sm leading-relaxed text-[#d9c9a8] italic"
      >
        "{message}"
      </motion.p>
    </motion.section>
  );
}
