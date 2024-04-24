"use client";

import { skills } from "@/lib/core/skills";
import { useMemo, useRef, useState } from "react";

import { ConditionActivateMenu } from "@/components/ConditionActivateMenu";
import { ConditionInput } from "@/components/ConditionInput";
import { ModifierInput } from "@/components/ModifierInput";
import { QualityLevelMeter } from "@/components/QualityLevelMeter";
import {
  SkillCheck3D20Rollable,
  SkillCheckAttributes,
  SkillCheckResult,
  SkillCheckSkillPointBreakdown,
} from "@/components/SkillCheck";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAttributeValues } from "@/lib/core/attributes";
import {
  conditions,
  getTotalModifierForConditions,
} from "@/lib/core/conditions";
import { formatNumberAsModifier } from "@/lib/format";
import { performSkillCheck } from "@/lib/performCheck";
import { cn } from "@/lib/utils";
import { Character, SkillCheckData } from "@/supabase/schema";
import { useCharacter } from "../CharacterProvider";

// temporary
const locale = "de";

export function SkillCheckDialog({
  onCheck,
  skillId,
  onClose,
}: {
  onCheck?: (
    skillCheckData: SkillCheckData,
    characterId: Character["id"]
  ) => void;
  skillId: number;
  onClose?: () => void;
}) {
  const character = useCharacter();
  const skill = skills.find(({ id }) => id === skillId)!;

  const skillPoints =
    character.data.talents[
      skill.optolithId as keyof typeof character.data.talents
    ] ?? 0;

  const [currentConditions, setCurrentConditions] = useState(() =>
    conditions.map(({ id }) => ({
      id,
      level: 0,
      isAlternativeEffect: false,
    }))
  );

  const { totalModifier: conditionsTotalModifier, isIncapacitated } = useMemo(
    () =>
      getTotalModifierForConditions({
        currentConditions,
        effectType: "skill",
        isEncumbranceApplicable: skill.isEncumbranceApplicable,
      }),
    [currentConditions, skill.isEncumbranceApplicable]
  );

  const [customModifier, setCustomModifier] = useState(0);

  const totalModifier = conditionsTotalModifier + customModifier;

  const [lastSkillCheckData, setLastSkillCheckData] =
    useState<SkillCheckData>();

  const isRolled = Boolean(lastSkillCheckData);

  const currentActiveConditions = currentConditions.filter(
    ({ level }) => level > 0
  );

  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={true} onOpenChange={() => onClose?.()}>
      <DialogContent ref={dialogContentRef}>
        <DialogHeader className="items-center">
          <DialogTitle>{skill.name[locale]}</DialogTitle>
          <DialogDescription>Talentprobe</DialogDescription>
        </DialogHeader>
        <div data-skillpoints className="flex flex-col items-center gap-2">
          <div className="">Fertigkeitswert</div>
          <div className="text-2xl">{skillPoints}</div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <div data-modifiers className="flex flex-col gap-6">
            {currentActiveConditions.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
                {currentActiveConditions.map((condition) => (
                  <ConditionInput
                    effectType="skill"
                    key={condition.id}
                    conditionId={condition.id}
                    level={condition.level}
                    onLevelChange={
                      isRolled
                        ? undefined
                        : (level) => {
                            setCurrentConditions((currentConditions) =>
                              currentConditions.map((currentCondition) => {
                                if (currentCondition.id === condition.id) {
                                  return { ...currentCondition, level };
                                }
                                return currentCondition;
                              })
                            );
                          }
                    }
                    isAlternativeEffect={condition.isAlternativeEffect}
                    onIsAlternativeEffectChange={
                      isRolled
                        ? undefined
                        : (isAlternativeEffect) => {
                            setCurrentConditions((currentConditions) =>
                              currentConditions.map((currentCondition) => {
                                if (currentCondition.id === condition.id) {
                                  return {
                                    ...currentCondition,
                                    isAlternativeEffect,
                                  };
                                }
                                return currentCondition;
                              })
                            );
                          }
                    }
                    isEncumbranceApplicable={skill.isEncumbranceApplicable}
                  />
                ))}
              </div>
            ) : null}
            <div className="flex flex-col items-center gap-2">
              <ConditionActivateMenu
                conditionIds={currentConditions
                  .filter(({ level }) => level === 0)
                  .map(({ id }) => id)}
                onActivate={
                  isRolled
                    ? undefined
                    : (conditionId) => {
                        setCurrentConditions((currentConditions) =>
                          currentConditions.map((currentCondition) => {
                            if (currentCondition.id === conditionId) {
                              return { ...currentCondition, level: 1 };
                            }
                            return currentCondition;
                          })
                        );
                      }
                }
                disabled={isRolled}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <ModifierInput
                modifierValue={customModifier}
                onModifierValueChange={isRolled ? undefined : setCustomModifier}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div>Gesamt-Modifikator</div>
              <div className="text-2xl">
                {!isIncapacitated
                  ? formatNumberAsModifier(totalModifier)
                  : "Probe nicht möglich"}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <SkillCheckAttributes
                attributeValues={getAttributeValues(
                  skill.attributes,
                  character
                )}
                skillId={skill.id}
                modifier={totalModifier}
                width={16}
              />
              <SkillCheck3D20Rollable
                skillCheckData={lastSkillCheckData}
                skillId={skill.id}
              />
              <div className="relative">
                <div
                  className={cn(
                    "transition-opacity",
                    lastSkillCheckData
                      ? undefined
                      : "opacity-0 select-none pointer-events-none"
                  )}
                >
                  <SkillCheckSkillPointBreakdown
                    skillCheckData={lastSkillCheckData}
                    width={16}
                    collisionBoundary={dialogContentRef.current}
                  />
                  <SkillCheckResult
                    skillCheckData={lastSkillCheckData}
                    size="lg"
                  />
                  <div className="flex items-center justify-center gap-3 pt-6">
                    <Button
                      className="w-max"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setLastSkillCheckData(undefined);
                      }}
                    >
                      Zurücksetzen
                    </Button>
                    <Button
                      className="w-max"
                      size="sm"
                      onClick={() => {
                        onClose?.();
                      }}
                    >
                      Fertig
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute inset-0 grid place-items-center gap-1 transition-opacity [grid-auto-rows:1fr]",
                    lastSkillCheckData
                      ? "opacity-0 select-none pointer-events-none"
                      : "opacity-100"
                  )}
                >
                  <Button
                    className="uppercase w-max"
                    size="lg"
                    onClick={() => {
                      const skillCheckData = performSkillCheck({
                        attributeValues: getAttributeValues(
                          skill.attributes,
                          character
                        ),
                        skillPoints,
                        skillId: skill.id,
                        modifier: customModifier,
                        totalModifier,
                        currentConditions,
                      });
                      setLastSkillCheckData(skillCheckData);
                      onCheck?.(skillCheckData, character.id);
                    }}
                    disabled={isIncapacitated}
                  >
                    Probe würfeln
                  </Button>
                  <QualityLevelMeter
                    attributes={getAttributeValues(skill.attributes, character)}
                    skillPoints={skillPoints}
                    modifier={totalModifier}
                    isIncapacitated={isIncapacitated}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
