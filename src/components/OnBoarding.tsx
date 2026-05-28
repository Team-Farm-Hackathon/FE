import { SunSet } from "../assets";

type OnboardingProps = {
  onStart?: () => void;
  endingsCleared?: number;
  endingsTotal?: number;
};

export default function Onboarding({
  onStart,
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
        <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d] italic md:text-xs md:tracking-[0.6em]">
          A·GAME·THEORY·STORY
        </p>

        <h1 className="mt-6 text-4xl text-[#e8b86b] md:mt-8 md:text-6xl lg:text-7xl">
          상인의 법칙
        </h1>
        <p className="mt-3 text-sm text-[#c89a5a] italic md:mt-4 md:text-lg">
          The Merchant's Code
        </p>

        <div className="mt-8 text-center text-sm text-[#d9c9a8] md:mt-10 md:text-base lg:text-lg">
          <p>중세 교역 도시.</p>
          <p>협력과 배신 사이, 누가 살아남을 것인가?</p>
        </div>

        <div className="mt-10 flex w-full max-w-xs flex-col gap-3 font-medium md:mt-12 md:max-w-md">
          <button
            onClick={onStart}
            className="border-2 border-[#1a1108] bg-[#d9a04a] py-3 text-sm text-[#2a1d11] transition-transform hover:bg-[#e8b86b] active:translate-y-0.5 md:py-4 md:text-base"
          >
            ▶ 시 작 하 다
          </button>
        </div>

        <div className="absolute right-0 bottom-0 left-0 flex justify-between px-6 pb-4 text-xs text-[#6a4e2d] md:px-8 md:pb-6 md:text-sm">
          <span>
            ENDINGS {endingsCleared}/{endingsTotal}
          </span>
          <span> GAME THEORY 10s</span>
        </div>
      </div>
    </div>
  );
}
