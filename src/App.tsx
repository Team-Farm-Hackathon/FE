import Onboarding from "./components/OnBoarding";
import GameScreen from "./components/game/GameScreen";
import NpcIntro from "./components/game/NpcIntro";
import { useGameStore } from "./store/useGameStore";

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-100 flex-col items-center bg-[#1A1208]">
      {screen === "onboarding" && (
        <Onboarding onStart={() => setScreen("playing")} />
      )}
      {screen === "playing" && <GameScreen />}
      {screen === "intro" && <NpcIntro />}
    </div>
  );
}
