import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumberAsModifier } from "@/lib/format";
import {
  ConditionId,
  ConditionLevelValue,
  EffectType,
  Skill,
  conditionLevelLabel,
} from "@/lib/skills";
import { Ban, Minus, Plus, ShieldAlert, ShieldOff } from "lucide-react";
import { getConditionInfo } from "../lib/core/conditions";

const locale = "de";

export function ConditionInput({
  conditionId,
  level,
  onLevelChange,
  isAlternativeEffect = false,
  onIsAlternativeEffectChange,
  effectType,
  isEncumbranceApplicable = "maybe",
}: {
  conditionId: ConditionId;
  level: ConditionLevelValue;
  onLevelChange?: (level: ConditionLevelValue) => void;
  isAlternativeEffect?: boolean;
  onIsAlternativeEffectChange?: (isAlternativeEffect: boolean) => void;
  effectType: EffectType;
  isEncumbranceApplicable?: Skill["isEncumbranceApplicable"];
}) {
  const info = getConditionInfo({
    conditionId,
    level,
    isAlternativeEffect,
    effectType,
    isEncumbranceApplicable,
  });

  const Icon = info.condition.Icon;

  return (
    <div className="relative w-40 border border-border rounded-lg shadow-lg items-center flex flex-col gap-2 py-5 bg-card text-card-foreground">
      <div className="flex flex-col gap-1 items-center px-4 mt-[-34.5px]">
        {info.hasFixedEncumbrance ? (
          isEncumbranceApplicable ? (
            <ShieldAlert className="size-7 fill-card" />
          ) : (
            <ShieldOff className="size-7 fill-card text-slate-300" />
          )
        ) : (
          <Icon className="size-7 fill-card" />
        )}
        <div className="text-base tracking-wide font-semibold">
          {info.condition.name[locale]}
        </div>
      </div>
      <div className="w-full flex gap-1 justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-s-none"
              onClick={() => onLevelChange?.(level - 1)}
              disabled={!onLevelChange}
            >
              <Minus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {level > 1 ? (
              <>
                {info.condition.name[locale]} auf Stufe{" "}
                {conditionLevelLabel[level - 1][locale]} reduzieren
              </>
            ) : (
              <>{info.condition.name[locale]} entfernen</>
            )}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="text-2xl flex-1 font-serif">
            {conditionLevelLabel[level][locale]}
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">{info.conditionLevel.name[locale]}</p>
            <p>{info.conditionLevel.description[locale]}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-e-none"
              onClick={() => onLevelChange?.(level + 1)}
              disabled={level >= 4 || !onLevelChange}
            >
              <Plus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {level < 4 ? (
              <>
                {info.condition.name[locale]} auf Stufe{" "}
                {conditionLevelLabel[level + 1][locale]} erhöhen
              </>
            ) : (
              <>
                {info.condition.name[locale]} ist bereits auf der höchsten Stufe
              </>
            )}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="h-7 w-full px-4 flex justify-center items-center">
        {info.effectValue === "incapacitated" ? (
          <Ban className="size-5 text-muted-foreground" />
        ) : (
          <span className="text-xl">
            {formatNumberAsModifier(info.effectValue)}
          </span>
        )}
      </div>
      {info.hasAlternativeEffect ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              pressed={
                info.hasFixedEncumbrance
                  ? !!isEncumbranceApplicable
                  : isAlternativeEffect
              }
              onPressedChange={(pressed) =>
                onIsAlternativeEffectChange?.(pressed)
              }
              size="xs"
              className="absolute -bottom-2.5 right-1/2 w-max translate-x-1/2"
              disabled={
                info.hasFixedEncumbrance || !onIsAlternativeEffectChange
              }
            >
              {info.conditionLevel.alternativeEffectName[locale]}
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold">
              {info.conditionLevel.alternativeEffectName[locale]}
            </p>
            <p>{info.conditionLevel.alternativeEffectDescription[locale]}</p>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
