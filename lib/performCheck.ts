import { SkillCheckData } from "@/supabase/schema";
import { roll3D20 } from "./dice";
import { calculateChance, getSkillCheckResult } from "./skillCheck";

export function performSkillCheck(
  input: Omit<SkillCheckData, "chance" | "rolls" | "result">
): SkillCheckData {
  const chance = calculateChance(
    input.attributeValues,
    input.skillPoints,
    input.totalModifier
  );
  const rolls = roll3D20(); // [1, 1, 5] as const;
  const result = getSkillCheckResult(
    rolls,
    input.attributeValues,
    input.skillPoints,
    input.modifier
  );

  return {
    ...input,
    chance,
    rolls,
    result,
  };
}
