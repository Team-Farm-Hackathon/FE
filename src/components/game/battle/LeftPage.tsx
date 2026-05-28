import type { Npc, Round } from "../../../types/game";
import { EVENT_INFO } from "../../../game/payoff";
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
      <h2 className="mt-2 text-2xl text-[#3d2818] md:text-3xl">{npc.name}</h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5a4326] md:text-[15px]">
        "{npc.intro[0]}" — {npc.title}.
      </p>

      <hr className="my-6 border-[#c9b48a]" />

      <p className="text-[10px] tracking-[0.3em] text-[#8a6a3d] md:text-xs">
        이번 라운드의 규칙
      </p>
      {event && (
        <div className="mt-3 rounded-md border border-[#c9b48a] bg-[#f5e6c8] p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">{event.icon}</span>
            <span className="text-base text-[#3d2818] md:text-lg">
              {event.name}
            </span>
          </div>
          <p className="mt-2 text-xs text-[#7a5a3a] md:text-sm">{event.desc}</p>
        </div>
      )}

      <p className="mt-6 text-[10px] tracking-[0.3em] text-[#8a6a3d] md:text-xs">
        지난 라운드 기록
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm">
        {history.length === 0 ? (
          <li className="text-xs text-[#8a6a3d] italic">
            — 아직 기록이 없다 —
          </li>
        ) : (
          history.map((r) => (
            <HistoryRow key={r.turn} round={r} npcName={npc.name} />
          ))
        )}
      </ul>
    </div>
  );
}
