import { SunSet } from "../assets";

type OnboardingProps = {
  onStart?: () => void;
  onContinue?: () => void;
  endingsCleared?: number;
  endingsTotal?: number;
};

export default function Onboarding({
  onStart,
  onContinue,
  endingsCleared = 0,
  endingsTotal = 4,
}: OnboardingProps) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden bg-[#1a1108]">
      <img
        src={SunSet}
        alt="sunset"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pt-8 pb-6">
        <p className="text-xs tracking-[0.6em] text-[#8a6a3d] italic">
          A·GAME·THEORY·STORY
        </p>

        <h1 className="mt-8 text-7xl text-[#e8b86b]">상인의 법칙</h1>
        <p className="mt-4 text-lg text-[#c89a5a] italic">
          The Merchant's Code
        </p>

        <div className="mt-10 text-center text-lg text-[#d9c9a8]">
          <p>중세 교역 도시.</p>
          <p>협력과 배신 사이, 누가 살아남을 것인가?</p>
        </div>

        <div className="mt-12 flex w-full max-w-md flex-col gap-3 font-medium">
          <button
            onClick={onStart}
            className="border-2 border-[#1a1108] bg-[#d9a04a] py-4 text-base text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5"
          >
            ▶ 시 작 하 다
          </button>
          <button
            onClick={onContinue}
            className="border-2 border-[#1a1108] bg-[#3d2818] py-4 text-base text-[#d9c9a8] transition-transform hover:bg-[#4d3320] active:translate-y-0.5"
          >
            이 어 하 기
          </button>
        </div>

        <div className="absolute right-0 bottom-0 left-0 flex justify-between px-8 pb-6 text-sm text-[#6a4e2d]">
          <span>
            ENDINGS {endingsCleared}/{endingsTotal}
          </span>
          <span> GAME THEORY 10s</span>
        </div>
      </div>
    </div>
  );
}
