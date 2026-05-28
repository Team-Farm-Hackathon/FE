import { NPCS, NPC_ICON } from "../../../game/npcs";
import { CHOICE, type NpcId, type Round } from "../../../types/game";
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
    <section className="flex flex-col rounded-md border-2 border-[#3d2818] bg-[#2a1d11] p-5 md:w-100 md:shrink-0">
      <div className="mt-4 flex gap-4">
        <div className="flex h-36 w-32 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 border-[#8a6a3d] bg-linear-to-b from-[#3d2818] to-[#1a1108]">
          <img src={icon} alt={npc.name} className="h-28 w-28 object-contain" />
        </div>
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
        {history.map((r) => (
          <RoundRow key={r.turn} round={r} />
        ))}
      </div>
    </section>
  );
}
