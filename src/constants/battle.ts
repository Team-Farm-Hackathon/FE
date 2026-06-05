import { CHOICE, type Choice, type NpcId } from "../types/game";

export type Phase = "intro" | "choose" | "result";

export const NPC_TIER: Record<NpcId, "I" | "II" | "III" | "IV"> = {
  // STAGE 1 · 시골
  naive: "I",
  // STAGE 2 · 마을
  bard: "II",
  baker: "II",
  jester: "II",
  wanderer: "II",
  // STAGE 3 · 변두리
  mercenary: "III",
  guildmaster: "III",
  mentor: "III",
  cheater: "III",
  grudger: "III",
  avenger: "III",
  // STAGE 4 · 도시
  king: "IV",
  noblewoman: "IV",
};

export type ReactionKey = "CC" | "CD" | "DC" | "DD";

export function codeOf(c: Choice): "C" | "D" {
  return c === CHOICE.COOPERATE ? "C" : "D";
}

export function reactionKeyOf(my: Choice, opp: Choice): ReactionKey {
  return `${codeOf(my)}${codeOf(opp)}` as ReactionKey;
}
