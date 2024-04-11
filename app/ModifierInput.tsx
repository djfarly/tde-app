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
    <div className="relative w-40 border border-border rounded-lg shadow-lg items-center flex flex-col gap-2 py-5 bg-card text-card-foreground">
      <div className="flex flex-col gap-1 items-center px-4 mt-[-34.5px]">
        {modifierValue === 0 ? (
          <CircleDot className="size-7 fill-card" />
        ) : modifierValue > 0 ? (
          <CirclePlus className="size-7 fill-card" />
        ) : (
          <CircleMinus className="size-7 fill-card" />
        )}
        <div className="text-base tracking-wide font-semibold">Modifikator</div>
      </div>
      <div className="w-full flex gap-1 items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="rounded-s-none"
              onClick={() => onModifierValueChange?.(modifierValue - 1)}
              disabled={modifierValue <= -MAX_MODIFIER}
            >
              <Minus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Modifikator um eine Stufe senken</TooltipContent>
        </Tooltip>
        <div className="text-xl flex-1 text-center">
          {formatNumberAsModifier(modifierValue)}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="rounded-e-none"
              onClick={() => onModifierValueChange?.(modifierValue + 1)}
              disabled={modifierValue >= MAX_MODIFIER}
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
