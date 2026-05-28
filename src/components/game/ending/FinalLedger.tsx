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
  return (
    <section className="flex w-full flex-col rounded-md border border-[#3d2818] bg-[#0a0805]/80 p-5 backdrop-blur-sm md:w-80">
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">
        + FINAL LEDGER +
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <LedgerRow icon="🪙" label="최종 골드" value={`${gold}`} />
        <LedgerRow icon="⭐" label="평판" value={`${reputation} / 100`} />
        <LedgerRow
          icon="🤝"
          label="협력률"
          value={`${coopRate}%`}
          accent="#8fbe70"
        />
        <LedgerRow
          icon="🗡"
          label="배신 횟수"
          value={`${defectCount}`}
          accent="#e87560"
        />
        <LedgerRow
          icon="🎯"
          label="추리 적중"
          value={`${guessCorrect}/${guessAttempts}`}
        />
      </div>
    </section>
  );
}
