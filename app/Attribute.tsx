import testChar from "@/lib/chars/faffi.json";
import { D20 } from "@/lib/dice";
import { attributes } from "@/lib/skills";
import { cva, VariantProps } from "class-variance-authority";
import { Square, Squircle } from "lucide-react";

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

function getAttribute(attributeId: number) {
  return attributes.find(({ id }) => id === attributeId);
}

function getAttributeValue(attributeId: number) {
  const attribute = getAttribute(attributeId);
  return testChar.attr.values.find(({ id }) => id === attribute!.optolithId)!
    .value;
}

const attributeVariants = cva(
  "flex flex-col p-0.5 items-center justify-evenly",
  {
    variants: {
      attribute: {
        COU: "bg-red-200",
        SGC: "bg-purple-200",
        INT: "bg-lime-200",
        CHA: "bg-slate-200",
        DEX: "bg-yellow-200 ",
        AGI: "bg-sky-200",
        CON: "bg-white",
        STR: "bg-orange-200",
        // COU: "bg-red-600 text-white",
        // SGC: "bg-purple-600 text-white",
        // INT: "bg-lime-600 text-white",
        // CHA: "bg-slate-800 text-white",
        // DEX: "bg-yellow-300 text-black ",
        // AGI: "bg-sky-600 text-white",
        // CON: "bg-white text-black",
        // STR: "bg-orange-500 text-white",
      },
      size: {
        sm: "h-10 w-8 text-sm",
        md: "h-12 w-10 text-base",
      },
    },
    defaultVariants: {
      attribute: "SGC",
      size: "md",
    },
  }
);

export interface AttributeProps extends VariantProps<typeof attributeVariants> {
  attributeId: number;
  attributeValue?: number;
  className?: string;
  modifier?: number;
}

const locale = "de";

export function Attribute({
  attributeId,
  attributeValue: _attributeValue,
  modifier,
  className,
  ...props
}: AttributeProps) {
  const attribute = getAttribute(attributeId);
  const attributeValue = _attributeValue ?? getAttributeValue(attributeId);

  return (
    // <div className="relative">
    <div
      className={attributeVariants({
        attribute: props.attribute ?? attribute?.shorthand["en"],
        className,
      })}
    >
      <span className="leading-none text-muted-foreground">
        {attribute?.shorthand[locale]}
      </span>
      <span className="leading-none text-foreground font-medium tracking-tighter tabular-nums">
        {modifier ? (
          <>
            <span className="line-through opacity-50 inline-block mr-1">
              {attributeValue}
            </span>
            <span>{attributeValue + modifier}</span>
          </>
        ) : (
          attributeValue
        )}
      </span>
    </div>
    // </div>
  );
}

export function Attributes({
  attributes,
}: {
  attributes: [number, number, number];
}) {
  return (
    <div className="flex items-center rounded-sm overflow-clip w-max border border-border">
      <Attribute attributeId={attributes[0]} />
      <Attribute attributeId={attributes[1]} />
      <Attribute attributeId={attributes[2]} />
    </div>
  );
}
