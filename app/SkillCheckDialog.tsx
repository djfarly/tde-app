"use client";

import { attributes, conditions, skills } from "@/lib/skills";
import { useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import testChar from "@/lib/chars/faffi.json";
import { getTotalModifierForConditions } from "@/lib/core/conditions";
import { formatNumberAsModifier } from "@/lib/format";
import { LogEntry, SkillCheckLogEntry } from "@/lib/log";
import { performSkillCheck } from "@/lib/performCheck";
import { skillCheckPartIndices, skillCheckResultName } from "@/lib/skillCheck";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { ActivateConditionMenu } from "./ActivateConditionMenu";
import { Attribute } from "./Attribute";
import { Chance } from "./Chance";
import { ConditionInput } from "./ConditionInput";
import { ModifierInput } from "./ModifierInput";
import { QualityLevelBadge } from "./QualityLevelBadge";
import { RollableD20 } from "./RollableD20";
import {
  SkillCheck3D20Rollable,
  SkillCheckAttributes,
  SkillCheckResult,
  SkillCheckSkillPointBreakdown,
} from "@/components/SkillCheck";

// temporary
const locale = "de";

function formatAsPercentage(value: number) {
  return value.toLocaleString("de-DE", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

function getAttributeValue(attributeId: number) {
  return testChar.attr.values.find(
    ({ id }) =>
      id === attributes.find(({ id }) => id === attributeId)!.optolithId
  )!.value;
}

function getAttributeValues(attributeIds: [number, number, number]) {
  return attributeIds.map((attributeId) => getAttributeValue(attributeId)) as [
    number,
    number,
    number
  ];
}

export function SkillCheckDialog({
  onAddLogEntry,
  skillId,
  onClose,
}: {
  onAddLogEntry: (entry: LogEntry) => void;
  skillId: number;
  onClose: () => void;
}) {
  const skill = skills.find(({ id }) => id === skillId)!;

  const skillPoints =
    testChar.talents[skill.optolithId as keyof typeof testChar.talents] ?? 0;

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

  const [lastSkillCheckLogEntry, setLastSkillCheckLogEntry] =
    useState<SkillCheckLogEntry>();

  const isRolled = Boolean(lastSkillCheckLogEntry);

  const currentActiveConditions = currentConditions.filter(
    ({ level }) => level > 0
  );

  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent ref={dialogContentRef}>
        <DialogHeader className="items-center">
          <DialogTitle>{skill.name[locale]}</DialogTitle>
          <DialogDescription>Talentprobe</DialogDescription>
        </DialogHeader>
        <div data-skillpoints className="flex flex-col gap-2 items-center">
          <div className="">Fertigkeitswert</div>
          <div className="text-2xl">{skillPoints}</div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <div data-modifiers className="flex flex-col gap-6">
            {currentActiveConditions.length > 0 ? (
              <div className="flex items-center gap-x-4 gap-y-6 justify-center flex-wrap">
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
            <div className="flex flex-col gap-2 items-center">
              <ActivateConditionMenu
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
            <div className="flex flex-col gap-2 items-center">
              <ModifierInput
                modifierValue={customModifier}
                onModifierValueChange={isRolled ? undefined : setCustomModifier}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div>Gesamt-Modifikator</div>
              <div className="text-2xl">
                {!isIncapacitated
                  ? formatNumberAsModifier(totalModifier)
                  : "Probe nicht möglich"}
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <SkillCheckAttributes
                skillId={skill.id}
                modifier={totalModifier}
                width={16}
              />
              <SkillCheck3D20Rollable
                skillCheckLogEntry={lastSkillCheckLogEntry}
                skillId={skill.id}
              />
              <div className="relative">
                <div
                  className={cn(
                    "transition-opacity",
                    lastSkillCheckLogEntry
                      ? undefined
                      : "opacity-0 select-none pointer-events-none"
                  )}
                >
                  <SkillCheckSkillPointBreakdown
                    skillCheckLogEntry={lastSkillCheckLogEntry}
                    width={16}
                    collisionBoundary={dialogContentRef.current}
                  />
                  <SkillCheckResult
                    skillCheckLogEntry={lastSkillCheckLogEntry}
                    size="lg"
                  />
                  <div className="flex gap-3 pt-6 items-center justify-center">
                    <Button
                      className="w-max"
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setLastSkillCheckLogEntry(undefined);
                      }}
                    >
                      Zurücksetzen
                    </Button>
                    <Button
                      className="w-max"
                      size="sm"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Fertig
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute inset-0 grid place-items-center gap-1 transition-opacity [grid-auto-rows:1fr]",
                    lastSkillCheckLogEntry
                      ? "opacity-0 select-none pointer-events-none"
                      : "opacity-100"
                  )}
                >
                  <Button
                    className="w-max uppercase"
                    size="lg"
                    onClick={() => {
                      const skillCheckLogEntry = performSkillCheck({
                        attributeValues: getAttributeValues(skill.attributes),
                        skillPoints,
                        characterId: testChar.id,
                        skillId: skill.id,
                        modifier: totalModifier,
                        modifierComponents: {
                          difficulty: 0,
                          specialAbilities: 0,
                          confusion: 0,
                          encumbrance: 0,
                          fear: 0,
                          pain: 0,
                          paralysis: 0,
                          rapture: 0,
                          stupor: 0,
                        },
                      });
                      setLastSkillCheckLogEntry(skillCheckLogEntry);
                      onAddLogEntry(skillCheckLogEntry);
                      // toast(
                      //   skillCheckLogEntry.result.isSuccess
                      //     ? `Erfolgreiche Probe auf ${skill.name[locale]} (QS ${skillCheckLogEntry.result.qualityLevel})`
                      //     : `Probe auf ${skill.name[locale]} fehlgeschlagen`,
                      //   {
                      //     description: skillCheckLogEntry.rolls.join(" | "),
                      //   }
                      // );
                    }}
                    disabled={isIncapacitated}
                  >
                    Probe würfeln
                  </Button>
                  <Chance
                    attributes={getAttributeValues(skill.attributes)}
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
