import Onboarding from "./components/OnBoarding";
import GameScreen from "./components/game/GameScreen";
import NpcIntro from "./components/game/NpcIntro";
import Battle from "./components/game/Battle";
import GuessNpc from "./components/game/GuessNpc";
import Ending from "./components/game/Ending";
import { useGameStore } from "./store/useGameStore";

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);
  const unlockedEndings = useGameStore((s) => s.unlockedEndings);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-100 flex-col items-center bg-[#1A1208]">
      {screen === "onboarding" && (
        <Onboarding
          onStart={() => setScreen("playing")}
          endingsCleared={unlockedEndings.length}
          endingsTotal={4}
        />
      )}
      {screen === "playing" && <GameScreen />}
      {screen === "intro" && <NpcIntro />}
      {screen === "battle" && <Battle />}
      {screen === "guess" && <GuessNpc />}
      {screen === "ending" && <Ending />}
    </div>
  );
}
