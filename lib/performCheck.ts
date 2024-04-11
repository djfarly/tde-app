import { roll3D20 } from "./dice";
import { SkillCheckLogEntry } from "./log";
import { calculateChance, getSkillCheckResult } from "./skillCheck";
import { Skill } from "./skills";

export function performSkillCheck({
  attributeValues,
  skillPoints,
  characterId,
  skillId,
  modifier,
  modifierComponents,
}: {
  attributeValues: [number, number, number];
  skillPoints: number;
  characterId: string;
  skillId: Skill["id"];
  modifier: number;
  modifierComponents: SkillCheckLogEntry["modifierComponents"];
}): SkillCheckLogEntry {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const chance = calculateChance(attributeValues, skillPoints, modifier);
  const rolls = roll3D20(); // [1, 1, 5] as const;
  const result = getSkillCheckResult(
    rolls,
    attributeValues,
    skillPoints,
    modifier
  );

  return {
    type: "skillCheck",
    id,
    createdAt,
    characterId,
    skillId,
    attributeValues,
    skillPoints,
    modifier,
    modifierComponents,
    chance,
    rolls,
    result,
  };
}
