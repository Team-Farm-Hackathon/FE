import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { STAGES } from "../../game/stages";
import { NPCS, NPC_ICON } from "../../game/npcs";
import { EVENT_INFO } from "../../game/payoff";
import { CHOICE, type Choice, type Npc } from "../../types/game";
import Header from "../common/Header";

type Phase = "choose" | "result";

export default function Battle() {
  const currentStage = useGameStore((s) => s.currentStage);
  const currentNpcId = useGameStore((s) => s.currentNpcId);
  const battleHistory = useGameStore((s) => s.battleHistory);
  const currentEvent = useGameStore((s) => s.currentEvent);
  const lastRoundPayoff = useGameStore((s) => s.lastRoundPayoff);
  const playRound = useGameStore((s) => s.playRound);
  const prepareNextRound = useGameStore((s) => s.prepareNextRound);
  const setScreen = useGameStore((s) => s.setScreen);

  const [phase, setPhase] = useState<Phase>("choose");

  const stage = STAGES.find((s) => s.id === currentStage);
  if (!stage || !currentNpcId) return null;

  const npc = NPCS[currentNpcId];
  const icon = NPC_ICON[currentNpcId];

  const roundNumber = battleHistory.length + (phase === "choose" ? 1 : 0);
  const totalRounds = stage.rounds;
  const isLastRound = battleHistory.length >= totalRounds;
  const lastRound = battleHistory[battleHistory.length - 1];

  const handleChoose = (choice: Choice) => {
    playRound(choice);
    setPhase("result");
  };

  const handleNext = () => {
    if (battleHistory.length >= totalRounds) {
      setScreen("guess");
    } else {
      prepareNextRound();
      setPhase("choose");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#1A1208]">
      <Header />

      <div className="flex items-center justify-between px-5 py-2 text-[10px] tracking-widest text-[#8a6a3d]">
        <span>STAGE {stage.id}</span>
        <span>
          ROUND {Math.min(roundNumber, totalRounds)}/{totalRounds}
        </span>
      </div>

      {phase === "choose" ? (
        <ChoosePhase
          icon={icon}
          npcName={npc.name}
          event={currentEvent}
          onChoose={handleChoose}
        />
      ) : (
        <ResultPhase
          npc={npc}
          icon={icon}
          lastRound={lastRound}
          payoff={lastRoundPayoff}
          isLastRound={isLastRound}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

function ChoosePhase({
  icon,
  npcName,
  event,
  onChoose,
}: {
  icon: string;
  npcName: string;
  event: { id: string } | null;
  onChoose: (c: Choice) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 px-5 py-4">
      {event && (
        <div className="flex w-full items-center gap-3 rounded border-2 border-[#8a6a3d] bg-[#2a1d11] px-4 py-3">
          <span className="text-2xl">
            {EVENT_INFO[event.id as keyof typeof EVENT_INFO].icon}
          </span>
          <div className="flex flex-col">
            <span className="text-sm tracking-widest text-[#e8b86b]">
              {EVENT_INFO[event.id as keyof typeof EVENT_INFO].name}
            </span>
            <span className="text-xs text-[#8a6a3d]">
              {EVENT_INFO[event.id as keyof typeof EVENT_INFO].desc}
            </span>
          </div>
        </div>
      )}

      <div className="flex h-48 w-full items-center justify-center bg-linear-to-b from-[#8a9aa8] to-[#3d2818]">
        <img src={icon} alt={npcName} className="h-36 w-36 object-contain" />
      </div>

      <p className="text-center text-xs tracking-widest text-[#8a6a3d]">
        당신의 선택은?
      </p>

      <div className="mt-auto flex w-full gap-3 pb-2">
        <button
          onClick={() => onChoose(CHOICE.COOPERATE)}
          className="flex-1 border-2 border-[#1a1108] bg-[#4a7a3a] py-5 text-base tracking-widest text-[#f5e6c8] transition-transform hover:bg-[#5c9050] active:translate-y-0.5"
        >
          협 력
        </button>
        <button
          onClick={() => onChoose(CHOICE.DEFECT)}
          className="flex-1 border-2 border-[#1a1108] bg-[#8a2a1a] py-5 text-base tracking-widest text-[#f5e6c8] transition-transform hover:bg-[#a83828] active:translate-y-0.5"
        >
          배 신
        </button>
      </div>
    </div>
  );
}

function ResultPhase({
  npc,
  icon,
  lastRound,
  payoff,
  isLastRound,
  onNext,
}: {
  npc: Npc;
  icon: string;
  lastRound: { myChoice: Choice; oppChoice: Choice } | undefined;
  payoff: { goldDelta: number; repDelta: number } | null;
  isLastRound: boolean;
  onNext: () => void;
}) {
  if (!lastRound || !payoff) return null;

  const reactionKey = `${codeOf(lastRound.myChoice)}${codeOf(lastRound.oppChoice)}` as
    | "CC"
    | "CD"
    | "DC"
    | "DD";
  const reaction = npc.reactions[reactionKey];
  const narration = NARRATIONS[reactionKey];

  return (
    <div className="flex flex-1 flex-col px-5 pb-4">
      <h3 className="mt-2 text-center text-sm tracking-[0.4em] text-[#e8b86b]">
        R·O·U·N·D R·E·S·U·L·T
      </h3>

      <div className="mt-4 flex items-center justify-around">
        <ChoiceCard label="나의 선택" choice={lastRound.myChoice} />
        <span className="text-lg tracking-widest text-[#8a6a3d]">VS</span>
        <ChoiceCard
          label="상대의 선택"
          choice={lastRound.oppChoice}
          npcIcon={icon}
        />
      </div>

      <div className="mt-4 rounded border-2 border-[#8a6a3d] bg-[#1a1108] p-4">
        <p className="text-sm leading-relaxed text-[#f5e6c8]">"{reaction}"</p>
        <p className="mt-2 text-right text-xs text-[#8a6a3d]">— {npc.name}</p>
      </div>

      <div className="mt-3 flex justify-center gap-3">
        <DeltaChip kind="gold" value={payoff.goldDelta} />
        <DeltaChip kind="rep" value={payoff.repDelta} />
      </div>

      <p className="mt-auto mb-3 text-center text-xs italic text-[#6a4e2d]">
        — {narration} —
      </p>

      <button
        onClick={onNext}
        className="w-full border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-sm tracking-widest text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
      >
        {isLastRound ? "추 리 하 기 ▶" : "다 음 ▶"}
      </button>
    </div>
  );
}

function ChoiceCard({
  label,
  choice,
  npcIcon,
}: {
  label: string;
  choice: Choice;
  npcIcon?: string;
}) {
  const isCoop = choice === CHOICE.COOPERATE;
  const bg = isCoop ? "bg-[#4a7a3a]" : "bg-[#8a2a1a]";
  const text = isCoop ? "협력" : "배신!";
  const textColor = isCoop ? "text-[#8fbe70]" : "text-[#e87560]";

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] tracking-widest text-[#8a6a3d]">
        {label}
      </span>
      <div
        className={`flex h-20 w-20 items-center justify-center border-4 border-[#1a1108] ${bg} shadow-[3px_3px_0_#000]`}
      >
        {npcIcon ? (
          <img src={npcIcon} alt="" className="h-14 w-14 object-contain" />
        ) : (
          <span className="text-3xl">{isCoop ? "🤝" : "🗡"}</span>
        )}
      </div>
      <span className={`text-sm tracking-widest ${textColor}`}>{text}</span>
    </div>
  );
}

function DeltaChip({ kind, value }: { kind: "gold" | "rep"; value: number }) {
  const positive = value >= 0;
  const icon = kind === "gold" ? "🪙" : "⭐";
  const borderColor = positive ? "border-[#4a7a3a]" : "border-[#8a2a1a]";
  const sign = value > 0 ? "+" : "";

  return (
    <div
      className={`flex items-center gap-1 border-2 ${borderColor} bg-[#1a1108] px-3 py-1`}
    >
      <span>{icon}</span>
      <span className="text-sm tracking-wider text-[#e8b86b]">
        {sign}
        {value}
      </span>
    </div>
  );
}

const NARRATIONS: Record<"CC" | "CD" | "DC" | "DD", string> = {
  CC: "두 사람은 손을 굳게 잡았다",
  CD: "상인은 골드만 챙기고 사라졌다",
  DC: "당신은 등을 돌렸다",
  DD: "차가운 침묵이 흘렀다",
};

function codeOf(c: Choice): "C" | "D" {
  return c === CHOICE.COOPERATE ? "C" : "D";
}
