import { useGameStore } from "../../store/useGameStore";
import { Favicon } from "../../assets";
import NavItem from "./NavItem";

type NavKey = "home" | "journey" | "codex";

export default function Sidebar() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);

  const active: NavKey =
    screen === "codex" || screen === "ending"
      ? "codex"
      : screen === "playing" ||
          screen === "intro" ||
          screen === "battle" ||
          screen === "guess"
        ? "journey"
        : "home";

  const goHome = () => setScreen("home");
  const goJourney = () => setScreen("playing");
  const goCodex = () => setScreen("codex");

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-[#2a1f12] bg-[#1a1208] text-[#e8b86b]">
      <div className="px-5 pt-5 pb-6">
        <div className="flex items-center gap-2">
          <img src={Favicon} alt="logo" className="h-8 w-8" />
          <div className="leading-tight">
            <div className="font-serif text-sm tracking-wider">tit-for-tat</div>
          </div>
        </div>
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
  );
}


