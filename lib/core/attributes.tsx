import { Character } from "@/supabase/schema";
import * as optolith from "../optolith";

export type Attribute = {
  id: number;
  optolithId: optolith.AttributeId;
  name: { en: string; de: string };
  shorthand: { en: string; de: string };
};

export const attributes = [
  {
    id: 1,
    optolithId: optolith.AttributeId.Courage,
    name: { en: "Courage", de: "Mut" },
    shorthand: { en: "COU", de: "MU" },
  },
  {
    id: 2,
    optolithId: optolith.AttributeId.Sagacity,
    name: { en: "Sagacity", de: "Klugheit" },
    shorthand: { en: "SGC", de: "KL" },
  },
  {
    id: 3,
    optolithId: optolith.AttributeId.Intuition,
    name: { en: "Intuition", de: "Intuition" },
    shorthand: { en: "INT", de: "IN" },
  },
  {
    id: 4,
    optolithId: optolith.AttributeId.Charisma,
    name: { en: "Charisma", de: "Charisma" },
    shorthand: { en: "CHA", de: "CH" },
  },
  {
    id: 5,
    optolithId: optolith.AttributeId.Dexterity,
    name: { en: "Dexterity", de: "Fingerfertigkeit" },
    shorthand: { en: "DEX", de: "FF" },
  },
  {
    id: 6,
    optolithId: optolith.AttributeId.Agility,
    name: { en: "Agility", de: "Gewandtheit" },
    shorthand: { en: "AGI", de: "GE" },
  },
  {
    id: 7,
    optolithId: optolith.AttributeId.Constitution,
    name: { en: "Constitution", de: "Konstitution" },
    shorthand: { en: "CON", de: "KO" },
  },
  {
    id: 8,
    optolithId: optolith.AttributeId.Strength,
    name: { en: "Strength", de: "Körperkraft" },
    shorthand: { en: "STR", de: "KK" },
  },
] as const satisfies Attribute[];

export function getAttributeValue(attributeId: number, character: Character) {
  return character.data.attr.values.find(
    ({ id }) =>
      id === attributes.find(({ id }) => id === attributeId)!.optolithId
  )!.value;
}

export function getAttributeValues(
  attributeIds: [number, number, number],
  character: Character
) {
  return attributeIds.map((attributeId) =>
    getAttributeValue(attributeId, character)
  ) as [number, number, number];
}

export function getAttribute(attributeId: number) {
  return attributes.find(({ id }) => id === attributeId);
}
