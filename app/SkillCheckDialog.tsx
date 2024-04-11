"use client";

import { attributes, conditions, skills } from "@/lib/skills";
import { useMemo, useState } from "react";

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
import { LogEntry } from "@/lib/log";
import { ActivateConditionMenu } from "./ActivateConditionMenu";
import { ConditionInput } from "./ConditionInput";
import { ModifierInput } from "./ModifierInput";
import { Attributes } from "./Attribute";
import { Chance } from "./Chance";
import { Button } from "@/components/ui/button";
import { performSkillCheck } from "@/lib/performCheck";
import { toast } from "sonner";
import { RollableD20 } from "./RollableD20";
import { D20 } from "@/lib/dice";

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

  const [lastRolls, setLastRolls] = useState<
    readonly [D20 | undefined, D20 | undefined, D20 | undefined]
  >([undefined, undefined, undefined]);

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
            <div className="flex items-center gap-x-4 gap-y-6 justify-center flex-wrap">
              {currentConditions
                .filter(({ level }) => level > 0)
                .map((condition) => (
                  <ConditionInput
                    effectType="skill"
                    key={condition.id}
                    conditionId={condition.id}
                    level={condition.level}
                    onLevelChange={(level) => {
                      setCurrentConditions((currentConditions) =>
                        currentConditions.map((currentCondition) => {
                          if (currentCondition.id === condition.id) {
                            return { ...currentCondition, level };
                          }
                          return currentCondition;
                        })
                      );
                    }}
                    isAlternativeEffect={condition.isAlternativeEffect}
                    onIsAlternativeEffectChange={(isAlternativeEffect) => {
                      setCurrentConditions((currentConditions) =>
                        currentConditions.map((currentCondition) => {
                          if (currentCondition.id === condition.id) {
                            return { ...currentCondition, isAlternativeEffect };
                          }
                          return currentCondition;
                        })
                      );
                    }}
                    isEncumbranceApplicable={skill.isEncumbranceApplicable}
                  />
                ))}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ActivateConditionMenu
                conditionIds={currentConditions
                  .filter(({ level }) => level === 0)
                  .map(({ id }) => id)}
                onActivate={(conditionId) => {
                  setCurrentConditions((currentConditions) =>
                    currentConditions.map((currentCondition) => {
                      if (currentCondition.id === conditionId) {
                        return { ...currentCondition, level: 1 };
                      }
                      return currentCondition;
                    })
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ModifierInput
                modifierValue={customModifier}
                onModifierValueChange={setCustomModifier}
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
            <div className="flex flex-col gap-2 items-center">
              <Attributes attributes={skill.attributes} />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Chance
                attributes={getAttributeValues(skill.attributes)}
                skillPoints={skillPoints}
                modifier={totalModifier}
              />
            </div>
            <div className="flex gap-2 items-center justify-center">
              <RollableD20
                dieIndex={0}
                side={lastRolls[0]}
                attributeId={skill.attributes[0]}
              />
              <RollableD20
                dieIndex={1}
                side={lastRolls[1]}
                attributeId={skill.attributes[1]}
              />
              <RollableD20
                dieIndex={2}
                side={lastRolls[2]}
                attributeId={skill.attributes[2]}
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button
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
                  setLastRolls(skillCheckLogEntry.rolls);
                  onAddLogEntry(skillCheckLogEntry);
                  toast(
                    skillCheckLogEntry.result.isSuccess
                      ? `Erfolgreiche Probe auf ${skill.name[locale]} (QS ${skillCheckLogEntry.result.qualityLevel})`
                      : `Probe auf ${skill.name[locale]} fehlgeschlagen`,
                    {
                      description: skillCheckLogEntry.rolls.join(" | "),
                    }
                  );
                }}
                disabled={isIncapacitated}
              >
                Probe würfeln
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
