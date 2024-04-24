import {
  Attribute as AttributeType,
  getAttribute,
  getAttributeValue,
} from "@/lib/core/attributes";
import { Character } from "@/supabase/schema";
import { VariantProps, cva } from "class-variance-authority";

const attributeVariants = cva(
  "flex flex-col p-0.5 items-center justify-evenly bg-card border-4 rounded-sm",
  {
    variants: {
      attribute: {
        COU: "border-red-300",
        SGC: "border-purple-300",
        INT: "border-lime-300",
        CHA: "border-stone-400",
        DEX: "border-yellow-300",
        AGI: "border-sky-300",
        CON: "border-stone-100",
        STR: "border-orange-300",
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

export interface AttributePropsBase
  extends VariantProps<typeof attributeVariants> {
  attributeId: AttributeType["id"];
  className?: string;
  modifier?: number;
}

export interface AttributePropsWithAttributeValue extends AttributePropsBase {
  attributeValue: number;
}

export interface AttributePropsWithCharacter extends AttributePropsBase {
  character: Character;
}

const locale = "de";

export function Attribute({
  attributeId,
  modifier,
  className,
  ...props
}: AttributePropsWithAttributeValue | AttributePropsWithCharacter) {
  const attribute = getAttribute(attributeId);
  const attributeValue =
    "attributeValue" in props
      ? props.attributeValue
      : getAttributeValue(attributeId, props.character);

  return (
    <div
      className={attributeVariants({
        attribute: props.attribute ?? attribute?.shorthand["en"],
        className,
      })}
    >
      <span className="text-sm leading-none text-muted-foreground">
        {attribute?.shorthand[locale]}
      </span>
      <span className="font-medium leading-none tracking-tighter text-foreground tabular-nums">
        {modifier ? (
          <>
            <span className="inline-block mr-1 line-through opacity-50">
              {attributeValue}
            </span>
            <span>{attributeValue + modifier}</span>
          </>
        ) : (
          attributeValue
        )}
      </span>
    </div>
  );
}

export interface AttributesPropsBase {
  attributeIds: [AttributeType["id"], AttributeType["id"], AttributeType["id"]];
}

export interface AttributesPropsWithAttributeValues
  extends AttributesPropsBase {
  attributeValues: [number, number, number];
}

export interface AttributesPropsWithCharacter extends AttributesPropsBase {
  character: Character;
}

export function Attributes(
  props: AttributesPropsWithAttributeValues | AttributesPropsWithCharacter
) {
  if ("attributeValues" in props) {
    return (
      <div className="flex gap-1">
        <Attribute
          attributeId={props.attributeIds[0]}
          attributeValue={props.attributeValues[0]}
        />
        <Attribute
          attributeId={props.attributeIds[1]}
          attributeValue={props.attributeValues[1]}
        />
        <Attribute
          attributeId={props.attributeIds[2]}
          attributeValue={props.attributeValues[2]}
        />
      </div>
    );
  }
  return (
    <div className="flex gap-1">
      <Attribute
        attributeId={props.attributeIds[0]}
        character={props.character}
      />
      <Attribute
        attributeId={props.attributeIds[1]}
        character={props.character}
      />
      <Attribute
        attributeId={props.attributeIds[2]}
        character={props.character}
      />
    </div>
  );
}
