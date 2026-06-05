import { AnimatePresence, motion } from "motion/react";
import type { Npc, Round } from "../../types/game";
import { EVENT_INFO } from "../../constants/payoff";
import HistoryRow from "./HistoryRow";

export default function LeftPage({
  npc,
  eventId,
  history,
}: {
  npc: Npc;
  eventId: string | null;
  history: Round[];
}) {
  const event = eventId ? EVENT_INFO[eventId as keyof typeof EVENT_INFO] : null;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mt-2 text-2xl text-[#3d2818] md:text-3xl"
      >
        {npc.name}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4 max-w-md text-sm leading-relaxed text-[#5a4326] md:text-[15px]"
      >
        "{npc.intro[0]}" — {npc.title}.
      </motion.p>

      <hr className="my-6 border-[#c9b48a]" />

      <p className="text-[10px] tracking-[0.3em] text-[#8a6a3d] md:text-xs">
        이번 라운드의 규칙
      </p>
      <AnimatePresence mode="wait">
        {event && (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-3 rounded-md border border-[#c9b48a] bg-[#f5e6c8] p-4"
          >
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ rotate: -25, scale: 0.6 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "backOut" }}
                className="text-xl"
              >
                {event.icon}
              </motion.span>
              <span className="text-base text-[#3d2818] md:text-lg">
                {event.name}
              </span>
            </div>
            <p className="mt-2 text-xs text-[#7a5a3a] md:text-sm">{event.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-[10px] tracking-[0.3em] text-[#8a6a3d] md:text-xs">
        지난 라운드 기록
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
        {history.length === 0 ? (
          <li className="text-xs text-[#8a6a3d] italic">
            — 아직 기록이 없다 —
          </li>
        ) : (
          <AnimatePresence initial={false}>
            {history.map((r) => (
              <HistoryRow key={r.turn} round={r} npcName={npc.name} />
            ))}
          </AnimatePresence>
        )}
      </ul>
    </div>
  );
}
