export type StageArea = "city" | "outskirts" | "village" | "country";

export type Stage = {
  id: number;
  name: string;
  area: StageArea;
  areaLabel: string;
  icon: string;
};

export const STAGES: Stage[] = [
  { id: 4, name: "왕의 알현", area: "city", areaLabel: "대도시", icon: "👑" },
  { id: 3, name: "장터의 흥정", area: "outskirts", areaLabel: "변두리", icon: "🛒" },
  { id: 2, name: "농민과의 거래", area: "village", areaLabel: "마을", icon: "🪙" },
  { id: 1, name: "첫 거래", area: "country", areaLabel: "시골", icon: "🌱" },
];

export const AREA_BG: Record<StageArea, string> = {
  city: "bg-gradient-to-b from-[#2a1f4a] to-[#7a4a6a]",
  outskirts: "bg-gradient-to-b from-[#7a4a6a] to-[#c97a3a]",
  village: "bg-gradient-to-b from-[#c97a3a] to-[#6a8a4a]",
  country: "bg-gradient-to-b from-[#6a8a4a] to-[#4a7a3a]",
};
