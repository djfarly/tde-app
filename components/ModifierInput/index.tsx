import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumberAsModifier } from "@/lib/format";
import { CircleDot, CircleMinus, CirclePlus, Minus, Plus } from "lucide-react";

const MAX_MODIFIER = 20;

export function ModifierInput({
  modifierValue,
  onModifierValueChange,
}: {
  modifierValue: number;
  onModifierValueChange?: (level: number) => void;
}) {
  return (
    <div className="relative flex flex-col items-center w-40 gap-2 py-5 border rounded-lg shadow-lg border-border bg-card text-card-foreground">
      <div className="flex flex-col gap-1 items-center px-4 mt-[-34.5px]">
        <div className="rounded-full bg-card">
          {modifierValue === 0 ? (
            <CircleDot className="size-7" />
          ) : modifierValue > 0 ? (
            <CirclePlus className="size-7" />
          ) : (
            <CircleMinus className="size-7" />
          )}
        </div>
        <div className="text-base font-semibold tracking-wide">Modifikator</div>
      </div>
      <div className="flex items-center justify-between w-full gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              aspect="square"
              className="rounded-s-none"
              onClick={() => onModifierValueChange?.(modifierValue - 1)}
              disabled={
                modifierValue <= -MAX_MODIFIER || !onModifierValueChange
              }
            >
              <Minus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Modifikator um eine Stufe senken</TooltipContent>
        </Tooltip>
        <div className="flex-1 text-xl text-center">
          {formatNumberAsModifier(modifierValue)}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              aspect="square"
              className="rounded-e-none"
              onClick={() => onModifierValueChange?.(modifierValue + 1)}
              disabled={modifierValue >= MAX_MODIFIER || !onModifierValueChange}
            >
              <Plus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Modifikator um eine Stufe erhöhen</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
