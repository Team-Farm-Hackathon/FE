import { CHOICE, type Choice, type NpcId } from "../../../types/game";

export type Phase = "intro" | "choose" | "result";

export const NPC_TIER: Record<NpcId, "I" | "II" | "III"> = {
  baker: "I",
  naive: "I",
  cheater: "II",
  wanderer: "II",
  mentor: "III",
  jester: "III",
  grudger: "III",
  avenger: "III",
};

export type ReactionKey = "CC" | "CD" | "DC" | "DD";

export function codeOf(c: Choice): "C" | "D" {
  return c === CHOICE.COOPERATE ? "C" : "D";
}

export function reactionKeyOf(my: Choice, opp: Choice): ReactionKey {
  return `${codeOf(my)}${codeOf(opp)}` as ReactionKey;
}
