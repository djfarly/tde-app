import {
  ConditionId,
  ConditionLevelBase,
  ConditionLevelValue,
  ConditionLevelWithAlternativeEffect,
  EffectMap,
  EffectType,
  Skill,
  conditions,
} from "@/lib/skills";

export function getConditionInfo<TLevel extends ConditionLevelValue>({
  conditionId,
  level,
  isAlternativeEffect,
  effectType,
  isEncumbranceApplicable = "maybe",
}: {
  conditionId: ConditionId;
  level: TLevel;
  isAlternativeEffect: boolean;
  effectType: EffectType;
  isEncumbranceApplicable?: Skill["isEncumbranceApplicable"];
}) {
  const condition = conditions.find(({ id }) => id === conditionId)!;
  const conditionLevel = condition.levels.find(({ level: l }) => l === level)!;

  const hasAlternativeEffect = "alternativeEffect" in conditionLevel;

  let effect = ((isAlternativeEffect && hasAlternativeEffect
    ? conditionLevel.alternativeEffect
    : conditionLevel.effect) ?? {}) as EffectMap | "incapacitated";

  const hasFixedEncumbrance =
    hasAlternativeEffect &&
    conditionId === "encumbrance" &&
    isEncumbranceApplicable !== "maybe";

  if (hasFixedEncumbrance) {
    if (isEncumbranceApplicable) {
      effect = conditionLevel.effect as EffectMap | "incapacitated";
    } else {
      effect = conditionLevel.alternativeEffect as EffectMap | "incapacitated";
    }
  }

  const effectValue =
    effect === "incapacitated" ? "incapacitated" : effect[effectType] ?? 0;

  if (hasFixedEncumbrance) {
    return {
      condition: condition as (typeof conditions)[1],
      conditionLevel:
        conditionLevel as ConditionLevelWithAlternativeEffect<TLevel>,
      effectValue,
      hasAlternativeEffect: true,
      hasFixedEncumbrance: true,
    } as const;
  } else if (hasAlternativeEffect) {
    return {
      condition,
      conditionLevel:
        conditionLevel as ConditionLevelWithAlternativeEffect<TLevel>,
      effectValue,
      hasAlternativeEffect: true,
      hasFixedEncumbrance: false,
    } as const;
  } else {
    return {
      condition,
      conditionLevel: conditionLevel as ConditionLevelBase<TLevel>,
      effectValue,
      hasAlternativeEffect: false,
      hasFixedEncumbrance: false,
    } as const;
  }
}

export type ConditionState = {
  id: ConditionId;
  level: ConditionLevelValue;
  isAlternativeEffect: boolean;
};

export function getTotalModifierForConditions({
  currentConditions,
  effectType,
  isEncumbranceApplicable,
}: {
  currentConditions: ConditionState[];
  effectType: EffectType;
  isEncumbranceApplicable: Skill["isEncumbranceApplicable"];
}) {
  const effectValues = currentConditions.map(
    ({ id, level, isAlternativeEffect }) => {
      if (level === 0) {
        return 0;
      }

      const info = getConditionInfo({
        conditionId: id,
        level,
        isAlternativeEffect,
        effectType,
        isEncumbranceApplicable,
      });

      return info.effectValue;
    }
  );

  let totalModifier: number = 0;
  let totalMultiplier: number = 1;
  let isIncapacitated = false;
  for (const effectValue of effectValues) {
    if (effectValue === "incapacitated") {
      isIncapacitated = true;
    }
    if (typeof effectValue === "number") {
      totalModifier += effectValue;
    }
    if (typeof effectValue === "string" && effectValue.startsWith("*")) {
      totalMultiplier *= Number.parseFloat(effectValue.slice(1));
    }
  }

  return {
    totalModifier,
    totalMultiplier,
    isIncapacitated,
  };
}
