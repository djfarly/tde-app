import { D20 } from "@/lib/dice";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Hexagon } from "lucide-react";

const ATTRIBUTE_IDS = {
  1: "COU",
  2: "SGC",
  3: "INT",
  4: "CHA",
  5: "DEX",
  6: "AGI",
  7: "CON",
  8: "STR",
} as const;

const d20Variants = cva("size-12 fill-card", {
  variants: {
    attribute: {
      COU: "text-red-300",
      SGC: "text-purple-300",
      INT: "text-lime-300",
      CHA: "text-slate-400",
      DEX: "text-yellow-300",
      AGI: "text-sky-300",
      CON: "text-slate-100",
      STR: "text-orange-300",
    },
  },
  defaultVariants: {
    attribute: "SGC",
  },
});

export interface IconD20Props extends VariantProps<typeof d20Variants> {
  side: D20 | undefined;
  attributeId?: keyof typeof ATTRIBUTE_IDS;
  className?: string;
}

export function IconD20({
  attribute,
  attributeId,
  side,
  className,
}: IconD20Props) {
  return (
    <div className="relative">
      <Hexagon
        className={d20Variants({
          className,
          attribute:
            attribute ??
            (attributeId !== undefined
              ? ATTRIBUTE_IDS[attributeId]
              : undefined),
        })}
      >
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={cn(
            "text-[9px] tracking-tight font-sans stroke-none fill-card-foreground",
            {
              "fill-rose-800 stroke-1 font-bold": side === 20,
              "fill-emerald-800 stroke-1 font-bold": side === 1,
            }
          )}
        >
          {side}
        </text>
      </Hexagon>
      {/* {side === 1 ? (
        <ChevronsUp
          data-crit="1"
          className="absolute top-[-5px] right-[calc(50%-8px)] size-4 stroke-current"
        />
      ) : null}
      {side === 20 ? (
        <ChevronsDown
          data-crit="20"
          className="absolute bottom-[-5px] right-[calc(50%-8px)] size-4 stroke-current"
        />
      ) : null} */}
    </div>
  );
}
