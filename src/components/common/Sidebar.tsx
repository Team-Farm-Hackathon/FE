import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import { Favicon } from "../../assets";
import NavItem from "./NavItem";

type NavKey = "home" | "journey" | "codex";

export default function Sidebar() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);
  const [open, setOpen] = useState(false);

  const active: NavKey =
    screen === "codex" || screen === "ending"
      ? "codex"
      : screen === "playing" ||
          screen === "intro" ||
          screen === "battle" ||
          screen === "guess"
        ? "journey"
        : "home";

  const go = (s: Parameters<typeof setScreen>[0]) => {
    setScreen(s);
    setOpen(false);
  };

  const goHome = () => go("home");
  const goJourney = () => go("playing");
  const goCodex = () => go("codex");

  return (
    <>
      {/* 모바일 햄버거 버튼 */}
      <button
        type="button"
        aria-label="menu"
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-40 flex h-10 w-10 items-center justify-center rounded border border-[#3a2a1c] bg-[#1a1208]/90 text-[#e8b86b] md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* 모바일 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 shrink-0 flex-col border-r border-[#2a1f12] bg-[#1a1208] text-[#e8b86b] transition-transform duration-200 md:static md:w-48 md:translate-x-0 lg:w-56 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-6">
          <div className="flex items-center gap-2">
            <img src={Favicon} alt="logo" className="h-8 w-8" />
            <div className="leading-tight">
              <div className="font-serif text-sm tracking-wider">tit-for-tat</div>
            </div>
          </div>
          <button
            type="button"
            aria-label="close menu"
            onClick={() => setOpen(false)}
            className="text-[#8a6a3d] md:hidden"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-2 text-[10px] tracking-[0.25em] text-[#5a4a2a] uppercase">
          Menu
        </div>

        <nav className="flex flex-col gap-1 px-2">
          <NavItem label="홈" isActive={active === "home"} onClick={goHome} />
          <NavItem
            label="여정"
            isActive={active === "journey"}
            onClick={goJourney}
          />
          <NavItem label="도감" isActive={active === "codex"} onClick={goCodex} />
        </nav>
      </aside>
    </>
  );
}
