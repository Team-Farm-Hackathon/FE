import Onboarding from "./components/OnBoarding";
import GameScreen from "./components/game/GameScreen";
import NpcIntro from "./components/game/NpcIntro";
import Battle from "./components/game/Battle";
import GuessNpc from "./components/game/GuessNpc";
import Ending from "./components/game/Ending";
import Sidebar from "./components/common/Sidebar";
import { useGameStore } from "./store/useGameStore";
import Home from "./components/Home";
import Codex from "./components/Codex";

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);
  const unlockedEndings = useGameStore((s) => s.unlockedEndings);

  if (screen === "onboarding") {
    return (
      <Onboarding
        onStart={() => setScreen("playing")}
        endingsCleared={unlockedEndings.length}
        endingsTotal={4}
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#1A1208] text-[#e8b86b]">
      <Sidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        {screen === "home" && <Home />}
        {screen === "playing" && <GameScreen />}
        {screen === "intro" && <NpcIntro />}
        {screen === "battle" && <Battle />}
        {screen === "guess" && <GuessNpc />}
        {screen === "ending" && <Ending />}
        {screen === "codex" && <Codex />}
      </main>
    </div>
  );
}