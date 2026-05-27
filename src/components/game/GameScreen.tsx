import Header from "../common/Header";
import StageMap from "./StageMap";

export default function GameScreen() {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <StageMap />
    </div>
  );
}
