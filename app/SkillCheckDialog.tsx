"use client";

import { attributes, conditions, skills } from "@/lib/skills";
import { useMemo, useState } from "react";

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
import { skillCheckResultName } from "@/lib/skillCheck";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, Equal } from "lucide-react";
import Marquee from "react-fast-marquee";
import { ActivateConditionMenu } from "./ActivateConditionMenu";
import { Attribute } from "./Attribute";
import { Chance } from "./Chance";
import { ConditionInput } from "./ConditionInput";
import { ModifierInput } from "./ModifierInput";
import { QualityLevelBadge } from "./QualityLevelBadge";
import { RollableD20 } from "./RollableD20";

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

const parts = [0, 1, 2] as const;

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

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
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
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center justify-center">
                {parts.map((part) => (
                  <Attribute
                    key={part}
                    attributeId={skill.attributes[part]}
                    modifier={totalModifier}
                    className="w-16 rounded-sm border border-border"
                  />
                ))}
              </div>
              <div className="flex gap-1 items-center justify-center">
                {parts.map((part) => (
                  <RollableD20
                    key={part}
                    dieIndex={part}
                    side={lastSkillCheckLogEntry?.rolls[part]}
                    attributeId={skill.attributes[part]}
                  />
                ))}
              </div>
              <div className="relative">
                <div
                  className={cn(
                    "transition-opacity",
                    lastSkillCheckLogEntry
                      ? undefined
                      : "opacity-0 select-none pointer-events-none"
                  )}
                >
                  <div className="relative">
                    <div className="flex gap-1 items-center">
                      <div className="w-16 h-8 leading-8 text-center bg-muted text-muted-foreground border border-border rounded-sm">
                        {lastSkillCheckLogEntry?.skillPoints ?? "-"} FP
                        {/* <ArrowRight className="absolute -right-2.5 fill-card top-[calc(50%-10px)] size-5 text-muted-foreground" /> */}
                      </div>
                      {parts.map((part) => {
                        const usedSkillPoints =
                          lastSkillCheckLogEntry?.result.parts?.[part]
                            .usedSkillPoints;
                        return (
                          <div
                            key={part}
                            className="w-16 h-8 leading-8 text-center bg-gradient-to-r from-transparent via-card to-transparent from-15% to-85% empty:via-transparent"
                          >
                            {usedSkillPoints && usedSkillPoints > 0
                              ? `-${usedSkillPoints}`
                              : null}
                          </div>
                        );
                      })}
                      <div
                        className={cn(
                          "w-16 h-8 leading-8 text-center bg-card border border-border rounded-sm bg-red-200 text-red-900",
                          {
                            "bg-green-200 text-green-900":
                              (lastSkillCheckLogEntry?.result
                                .remainingSkillPoints ?? -1) >= 0,
                          }
                        )}
                      >
                        {/* <Equal className="absolute -left-2.5 fill-card top-[calc(50%-10px)] size-5 text-muted-foreground" /> */}
                        {lastSkillCheckLogEntry?.result.remainingSkillPoints ??
                          "–"}{" "}
                        FP
                      </div>
                    </div>
                    <div className="absolute inset-0 grid place-items-center -z-10">
                      <Marquee direction="right" autoFill speed={10}>
                        <ChevronRight className="size-5 text-border mx-0.5" />
                      </Marquee>
                    </div>
                  </div>
                  <div className="text-3xl font-medium text-center mt-2">
                    {skillCheckResultName[
                      lastSkillCheckLogEntry?.result.type!
                    ]?.[locale] ?? "–"}
                  </div>
                  <div className="flex justify-center">
                    <QualityLevelBadge
                      level={lastSkillCheckLogEntry?.result.qualityLevel ?? 0}
                      size="lg"
                    >
                      Qualitätsstufe{" "}
                      {lastSkillCheckLogEntry?.result.qualityLevel ?? "–"}
                    </QualityLevelBadge>
                  </div>
                  <div className="flex gap-1 pt-2 items-center justify-center">
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
