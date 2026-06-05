import { motion } from "motion/react";
import { NPCS, NPC_ICON } from "../../constants/npcs";
import { CHOICE, type NpcId, type Round } from "../../types/game";
import RoundRow from "./RoundRow";
import StatBox from "./StatBox";

export default function Dossier({
  npcId,
  history,
}: {
  npcId: NpcId;
  history: Round[];
}) {
  const npc = NPCS[npcId];
  const icon = NPC_ICON[npcId];
  const myDefect = history.filter((r) => r.myChoice === CHOICE.DEFECT).length;
  const myCoop = history.length - myDefect;

  return (
    <motion.section
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col rounded-md border-2 border-[#3d2818] bg-[#2a1d11] p-5 md:w-100 md:shrink-0"
    >
      <div className="mt-4 flex gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.45, ease: "backOut" }}
          className="flex h-36 w-32 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#8a6a3d] bg-linear-to-b from-[#3d2818] to-[#1a1108]"
        >
          <img src={icon} alt={npc.name} className="h-28 w-28 object-contain" />
        </motion.div>
        <div className="flex flex-col justify-center">
          <p className="text-xl text-[#e8b86b]">{npc.name}</p>
          <p className="mt-1 text-[10px] tracking-widest text-[#8a6a3d]">
            {npc.title}
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <StatBox label="협력 횟수" value={myCoop} accent="#8fbe70" icon="♥" />
        <StatBox
          label="배신 횟수"
          value={myDefect}
          accent="#e87560"
          icon="🗡"
        />
      </div>

      <p className="mt-5 text-[10px] tracking-widest text-[#8a6a3d]">
        지난 행동
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {history.map((r, idx) => (
          <motion.div
            key={r.turn}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + idx * 0.04, duration: 0.3 }}
          >
            <RoundRow round={r} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
