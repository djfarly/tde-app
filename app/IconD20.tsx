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

const d20Variants = cva("size-10 [paint-order:stroke] stroke-border", {
  variants: {
    attribute: {
      COU: "fill-red-200",
      SGC: "fill-purple-200",
      INT: "fill-lime-200",
      CHA: "fill-slate-200",
      DEX: "fill-yellow-200 ",
      AGI: "fill-sky-200",
      CON: "fill-white",
      STR: "fill-orange-200",
      // COU: "fill-red-600 [&_text]:text-white",
      // SGC: "fill-purple-600 [&_text]:text-white",
      // INT: "fill-lime-600 [&_text]:text-white",
      // CHA: "fill-slate-800 [&_text]:text-white",
      // DEX: "fill-yellow-300 [&_text]:text-black ",
      // AGI: "fill-sky-600 [&_text]:text-white",
      // CON: "fill-white [&_text]:text-black",
      // STR: "fill-orange-500 [&_text]:text-white",
    },
  },
  defaultVariants: {
    attribute: "SGC",
  },
});

export interface IconD20Props extends VariantProps<typeof d20Variants> {
  side: D20;
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
            "text-[10px] tracking-tight font-sans stroke-none fill-black translate-y-px",
            {
              "fill-red-900 stroke-1 stroke-red-50 font-bold": side === 20,
              "fill-green-800 stroke-1 stroke-green-50 font-bold": side === 1,
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
