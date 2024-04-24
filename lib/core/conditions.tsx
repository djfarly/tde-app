import { Skill } from "@/lib/core/skills";
import {
  Brain,
  Eye,
  Ghost,
  HeartCrack,
  LucideIcon,
  Shell,
  Shield,
  Snowflake,
} from "lucide-react";

type ConditionLevelLabel = Record<
  ConditionLevelValue,
  { en: string; de: string }
>;

export const conditionLevelLabel: ConditionLevelLabel = {
  1: { en: "I", de: "I" },
  2: { en: "II", de: "II" },
  3: { en: "III", de: "III" },
  4: { en: "IV", de: "IV" },
};

export type EffectType =
  | "skill"
  | "attribute"
  | "attack"
  | "defense"
  | "cast"
  | "initiative"
  | "movement";

export type EffectMap = Partial<Record<EffectType, number | `*${number}`>>;

export type ConditionLevelValue = 1 | 2 | 3 | 4 | (number & {});

export type ConditionLevelBase<TLevel extends ConditionLevelValue> = {
  level: TLevel;
  name: { en: string; de: string };
  description: { en: string; de: string };
  effect: EffectMap | "incapacitated";
};

export type ConditionLevelWithAlternativeEffect<
  TLevel extends ConditionLevelValue
> = ConditionLevelBase<TLevel> & {
  alternativeEffect: EffectMap;
  alternativeEffectName: { en: string; de: string };
  alternativeEffectDescription: { en: string; de: string };
};

export type ConditionLevel<TLevel extends ConditionLevelValue> =
  | ConditionLevelBase<TLevel>
  | ConditionLevelWithAlternativeEffect<TLevel>;

export type Condition = {
  id: string;
  name: { en: string; de: string };
  Icon: LucideIcon;
  levels: [
    ConditionLevel<1>,
    ConditionLevel<2>,
    ConditionLevel<3>,
    ConditionLevel<4>
  ];
};

export const conditions = [
  {
    id: "confusion",
    name: { en: "Confusion", de: "Verwirrung" },
    Icon: Brain,
    levels: [
      {
        level: 1,
        name: { en: "Mildly confused", de: "Leicht verwirrt" },
        description: {
          en: "-1 on all checks",
          de: "-1 auf alle Proben",
        },
        effect: {
          skill: -1,
          attribute: -1,
          attack: -1,
          defense: -1,
          initiative: -1,
        },
      },
      {
        level: 2,
        name: { en: "Confused", de: "Verwirrt" },
        description: {
          en: "-2 on all checks",
          de: "-2 auf alle Proben",
        },
        effect: {
          skill: -2,
          attribute: -2,
          attack: -2,
          defense: -2,
          initiative: -2,
        },
      },
      {
        level: 3,
        name: { en: "Very confused", de: "Stark verwirrt" },
        description: {
          en: "-3 on all checks; complex actions (like spellcasting, liturgical chants, and the use of lore skills) are impossible",
          de: "-3 auf alle Proben; komplexe Handlungen (wie Zauberei, liturgische Gesänge und die Verwendung von Kenntnissen) sind unmöglich",
        },
        effect: {
          skill: -3,
          attribute: -3,
          attack: -3,
          defense: -3,
        },
      },
      {
        level: 4,
        name: { en: "Incapacitated", de: "Handlungsunfähig" },
        description: {
          en: "No action possible",
          de: "Keine Handlung möglich",
        },
        effect: "incapacitated",
      },
    ],
  },
  {
    id: "encumbrance",
    name: { en: "Encumbrance", de: "Belastung" },
    Icon: Shield,
    levels: [
      {
        level: 1,
        name: { en: "Mildly Encumbered", de: "Leicht belastet" },
        description: {
          en: "-1 penalty to applicable skill checks, -1 to AT, Defense, INI, and MOV",
          de: "Proben auf Talente, die durch Belastung erschwert sind -1, AT -1, Verteidigung -1, INI -1, GS -1 ",
        },
        effect: {
          skill: -1,
          attack: -1,
          defense: -1,
          initiative: -1,
          movement: -1,
        },
        alternativeEffect: {},
        alternativeEffectName: {
          en: "Ignore Encumbrance",
          de: "Belastung ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check is not affected by Encumbrance, ignore Encumbrance",
          de: "Probe ist nicht von Belastung betroffen, Belastung ignorieren",
        },
      },
      {
        level: 2,
        name: { en: "Encumbered", de: "Belastet" },
        description: {
          en: "-2 penalty to applicable skill checks, -2 to AT, Defense, INI, and MOV",
          de: "Proben auf Talente, die durch Belastung erschwert sind -2, AT -2, Verteidigung -2, INI -2, GS -2 ",
        },
        effect: {
          skill: -2,
          attack: -2,
          defense: -2,
          initiative: -2,
          movement: -2,
        },
        alternativeEffect: {},
        alternativeEffectName: {
          en: "Ignore Encumbrance",
          de: "Belastung ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check is not affected by Encumbrance, ignore Encumbrance",
          de: "Probe ist nicht von Belastung betroffen, Belastung ignorieren",
        },
      },
      {
        level: 3,
        name: { en: "Heavily Encumbered", de: "Schwer belastet" },
        description: {
          en: "-3 penalty to applicable skill checks, -3 to AT, Defense, INI, and MOV",
          de: "Proben auf Talente, die durch Belastung erschwert sind -3, AT -3, Verteidigung -3, INI -3, GS -3 ",
        },
        effect: {
          skill: -3,
          attack: -3,
          defense: -3,
          initiative: -3,
          movement: -3,
        },
        alternativeEffect: {},
        alternativeEffectName: {
          en: "Ignore Encumbrance",
          de: "Belastung ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check is not affected by Encumbrance, ignore Encumbrance",
          de: "Probe ist nicht von Belastung betroffen, Belastung ignorieren",
        },
      },
      {
        level: 4,
        name: { en: "Incapacitated", de: "Handlungsunfähig" },
        description: {
          en: "You can do nothing but set down the weight and rest",
          de: "Bis auf Last fallen lassen",
        },
        effect: "incapacitated",
        alternativeEffect: {},
        alternativeEffectName: {
          en: "Ignore Encumbrance",
          de: "Belastung ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check is not affected by Encumbrance, ignore Encumbrance",
          de: "Probe ist nicht von Belastung betroffen, Belastung ignorieren",
        },
      },
    ],
  },
  {
    id: "fear",
    name: { en: "Fear", de: "Furcht" },
    Icon: Ghost,
    levels: [
      {
        level: 1,
        name: { en: "Uneasy", de: "Beunruhigt" },
        description: {
          en: "-1 on all checks",
          de: "-1 auf alle Proben",
        },
        effect: {
          skill: -1,
          attribute: -1,
          attack: -1,
          defense: -1,
        },
      },
      {
        level: 2,
        name: { en: "Scared", de: "Verängstigt" },
        description: {
          en: "-2 on all checks",
          de: "-2 auf alle Proben",
        },
        effect: {
          skill: -2,
          attribute: -2,
          attack: -2,
          defense: -2,
        },
      },
      {
        level: 3,
        name: { en: "Panicked", de: "In Panik" },
        description: {
          en: "-3 on all checks",
          de: "-3 auf alle Proben",
        },
        effect: {
          skill: -3,
          attribute: -3,
          attack: -3,
          defense: -3,
        },
      },
      {
        level: 4,
        name: { en: "Catatonic", de: "Katatonisch" },
        description: {
          en: "And therefore incapacitated",
          de: "Handlungsunfähig",
        },
        effect: "incapacitated",
      },
    ],
  },
  {
    id: "pain",
    name: { en: "Pain", de: "Schmerz" },
    Icon: HeartCrack,
    levels: [
      {
        level: 1,
        name: { en: "Slight Pain", de: "Leichte Schmerzen" },
        description: {
          en: "-1 on all checks, -1 MOV",
          de: "-1 auf alle Proben, GS -1",
        },
        effect: {
          skill: -1,
          attribute: -1,
          attack: -1,
          defense: -1,
        },
      },
      {
        level: 2,
        name: { en: "Disturbing pain", de: "Ablenkende Schmerzen" },
        description: {
          en: "-2 on all checks, -2 MOV",
          de: "-2 auf alle Proben, GS -2",
        },
        effect: {
          skill: -2,
          attribute: -2,
          attack: -2,
          defense: -2,
        },
      },
      {
        level: 3,
        name: { en: "Severe Pain", de: "Starke Schmerzen" },
        description: {
          en: "-3 on all checks, -3 MOV",
          de: "-3 auf alle Proben, GS -3",
        },
        effect: {
          skill: -3,
          attribute: -3,
          attack: -3,
          defense: -3,
        },
      },
      {
        level: 4,
        name: { en: "Incapacitated", de: "Handlungsunfähig" },
        description: {
          en: "alternatively all checks -4",
          de: "ansonsten alle Proben -4",
        },
        effect: "incapacitated",
        alternativeEffect: {
          skill: -4,
          attribute: -4,
          attack: -4,
          defense: -4,
        },
        alternativeEffectName: {
          en: "Maintain ability to act",
          de: "Handlungsfähigkeit bewahren",
        },
        alternativeEffectDescription: {
          en: "Not incapacitated, but all checks -4",
          de: "Nicht handlungsunfähig, aber alle Proben -4",
        },
      },
    ],
  },
  {
    id: "paralysis",
    name: { en: "Paralysis", de: "Paralyse" },
    Icon: Snowflake,
    levels: [
      {
        level: 1,
        name: { en: "Slight paralysis", de: "Leicht versteift" },
        description: {
          en: "-1 to all checks involving movement or speech, reduce MOV by 25%",
          de: "alle Proben, die Bewegung oder Sprache erfordern, -1, GS nur noch 75%",
        },
        effect: {
          skill: -1,
          attribute: -1,
          attack: -1,
          defense: -1,
          movement: "*.75",
        },
        alternativeEffect: {
          movement: "*.75",
        },
        alternativeEffectName: {
          en: "Ignore Paralysis",
          de: "Paralyse ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check does not involve movement or speech, ignore Paralysis",
          de: "Probe erfordert keine Bewegung oder Sprache, Paralyse ignorieren",
        },
      },
      {
        level: 2,
        name: { en: "Stiff", de: "Versteift" },
        description: {
          en: "-2 to all checks involving movement or speech, reduce MOV by 50%",
          de: "alle Proben, die Bewegung oder Sprache erfordern, -2, GS nur noch 50%",
        },
        effect: {
          skill: -2,
          attribute: -2,
          attack: -2,
          defense: -2,
          movement: "*.5",
        },
        alternativeEffect: {
          movement: "*.5",
        },
        alternativeEffectName: {
          en: "Ignore Paralysis",
          de: "Paralyse ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check does not involve movement or speech, ignore Paralysis",
          de: "Probe erfordert keine Bewegung oder Sprache, Paralyse ignorieren",
        },
      },
      {
        level: 3,
        name: { en: "Hardly able to move", de: "Kaum mehr bewegungsfähig" },
        description: {
          en: "-3 to all checks involving movement or speech, reduce MOV by 75%",
          de: "alle Proben, die Bewegung oder Sprache erfordern, -3, GS nur noch 25%",
        },
        effect: {
          skill: -3,
          attribute: -3,
          attack: -3,
          defense: -3,
          movement: "*.25",
        },
        alternativeEffect: {
          movement: "*.25",
        },
        alternativeEffectName: {
          en: "Ignore Paralysis",
          de: "Paralyse ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check does not involve movement or speech, ignore Paralysis",
          de: "Probe erfordert keine Bewegung oder Sprache, Paralyse ignorieren",
        },
      },
      {
        level: 4,
        name: { en: "Unable to move", de: "Bewegungsunfähig" },
        description: {
          en: "No action possible that involves movement or speech",
          de: "Keine Handlung möglich, die Bewegung oder Sprache erfordert",
        },
        effect: "incapacitated",
        alternativeEffect: {
          movement: "*0",
        },
        alternativeEffectName: {
          en: "Ignore Paralysis",
          de: "Paralyse ignorieren",
        },
        alternativeEffectDescription: {
          en: "Check does not involve movement or speech, ignore Paralysis",
          de: "Probe erfordert keine Bewegung oder Sprache, Paralyse ignorieren",
        },
      },
    ],
  },
  {
    id: "rapture",
    name: { en: "Rapture", de: "Entrückung" },
    Icon: Eye,
    levels: [
      {
        level: 1,
        name: { en: "Slightly rapturous", de: "Leicht entrückt" },
        description: {
          en: "-1 to all skill and spell checks that are not agreeable to the Blessed One’s god",
          de: "Alle Proben auf Talente und Zauber -1, so sie nicht dem Gott des Geweihten gefällig sind",
        },
        effect: {
          skill: -1,
          cast: -1,
        },
        alternativeEffect: {},
        alternativeEffectName: {
          en: "God-pleasing action",
          de: "Gottgefällige Handlung",
        },
        alternativeEffectDescription: {
          en: "Check is agreeable to the Blessed One’s god, ignore Rapture",
          de: "Probe ist dem Gott des Geweihten gefällig, Entrückung ignorieren",
        },
      },
      {
        level: 2,
        name: { en: "Rapturous", de: "Entrückt" },
        description: {
          en: "+1 to all skill and spell checks agreeable to the Blessed One’s god, -2 to all other checks",
          de: "Alle dem Gott des Geweihten gefällige Proben auf Talente und Zauber +1, alle anderen -2",
        },
        effect: {
          skill: -2,
          cast: -2,
        },
        alternativeEffect: {
          skill: 1,
          cast: 1,
        },
        alternativeEffectName: {
          en: "God-pleasing action",
          de: "Gottgefällige Handlung",
        },
        alternativeEffectDescription: {
          en: "Check is agreeable to the Blessed One’s god, Rapture is beneficial",
          de: "Probe ist dem Gott des Geweihten gefällig, Entrückung ist förderlich",
        },
      },
      {
        level: 3,
        name: { en: "Very rapturous", de: "Stark entrückt" },
        description: {
          en: "+2 to all skill and spell checks agreeable to the Blessed One’s god, -3 to all other checks",
          de: "Alle dem Gott des Geweihten gefällige Proben auf Talente und Zauber +2, alle anderen -3",
        },
        effect: {
          skill: -3,
          cast: -3,
        },
        alternativeEffect: {
          skill: 2,
          cast: 2,
        },
        alternativeEffectName: {
          en: "God-pleasing action",
          de: "Gottgefällige Handlung",
        },
        alternativeEffectDescription: {
          en: "Check is agreeable to the Blessed One’s god, Rapture is beneficial",
          de: "Probe ist dem Gott des Geweihten gefällig, Entrückung ist förderlich",
        },
      },
      {
        level: 4,
        name: { en: "Implement of the god", de: "Ein Werkzeug des Gottes" },
        description: {
          en: "+3 to all skill and spell checks agreeable to the Blessed One’s god, -4 to all other checks",
          de: "Alle dem Gott des Geweihten gefällige Proben +3, alle anderen um 4 erschwert",
        },
        effect: {
          skill: -4,
          cast: -4,
        },
        alternativeEffect: {
          skill: 3,
          cast: 3,
        },
        alternativeEffectName: {
          en: "God-pleasing action",
          de: "Gottgefällige Handlung",
        },
        alternativeEffectDescription: {
          en: "Check is agreeable to the Blessed One’s god, Rapture is beneficial",
          de: "Probe ist dem Gott des Geweihten gefällig, Entrückung ist förderlich",
        },
      },
    ],
  },
  {
    id: "stupor",
    name: { en: "Stupor", de: "Betäubung" },
    Icon: Shell,
    levels: [
      {
        level: 1,
        name: { en: "Slightly drowsy", de: "Leicht angeschlagen" },
        description: {
          en: "-1 to all checks",
          de: "-1 auf alle Proben",
        },
        effect: {
          skill: -1,
          attribute: -1,
          attack: -1,
          defense: -1,
          initiative: -1,
        },
      },
      {
        level: 2,
        name: { en: "Lethargic", de: "Angeschlagen" },
        description: {
          en: "-2 to all checks",
          de: "-2 auf alle Proben",
        },
        effect: {
          skill: -2,
          attribute: -2,
          attack: -2,
          defense: -2,
          initiative: -2,
        },
      },
      {
        level: 3,
        name: { en: "Very sluggish", de: "Schwer angeschlagen" },
        description: {
          en: "-3 to all checks",
          de: "-3 auf alle Proben",
        },
        effect: {
          skill: -3,
          attribute: -3,
          attack: -3,
          defense: -3,
          initiative: -3,
        },
      },
      {
        level: 4,
        name: { en: "Incapacitated", de: "Handlungsunfähig" },
        description: {
          en: "No action possible",
          de: "Keine Handlung möglich",
        },
        effect: "incapacitated",
      },
    ],
  },
] as const satisfies Condition[];

export type ConditionId = (typeof conditions)[number]["id"] | (string & {});

export function getConditionInfo<TLevel extends ConditionLevelValue>({
  conditionId,
  level,
  isAlternativeEffect,
  effectType,
  isEncumbranceApplicable = "maybe",
}: {
  conditionId: ConditionId;
  level: TLevel;
  isAlternativeEffect: boolean;
  effectType: EffectType;
  isEncumbranceApplicable?: Skill["isEncumbranceApplicable"];
}) {
  const condition = conditions.find(({ id }) => id === conditionId)!;
  const conditionLevel = condition.levels.find(({ level: l }) => l === level)!;

  const hasAlternativeEffect = "alternativeEffect" in conditionLevel;

  let effect = ((isAlternativeEffect && hasAlternativeEffect
    ? conditionLevel.alternativeEffect
    : conditionLevel.effect) ?? {}) as EffectMap | "incapacitated";

  const hasFixedEncumbrance =
    hasAlternativeEffect &&
    conditionId === "encumbrance" &&
    isEncumbranceApplicable !== "maybe";

  if (hasFixedEncumbrance) {
    if (isEncumbranceApplicable) {
      effect = conditionLevel.effect as EffectMap | "incapacitated";
    } else {
      effect = conditionLevel.alternativeEffect as EffectMap | "incapacitated";
    }
  }

  const effectValue =
    effect === "incapacitated" ? "incapacitated" : effect[effectType] ?? 0;

  if (hasFixedEncumbrance) {
    return {
      condition: condition as (typeof conditions)[1],
      conditionLevel:
        conditionLevel as ConditionLevelWithAlternativeEffect<TLevel>,
      effectValue,
      hasAlternativeEffect: true,
      hasFixedEncumbrance: true,
    } as const;
  } else if (hasAlternativeEffect) {
    return {
      condition,
      conditionLevel:
        conditionLevel as ConditionLevelWithAlternativeEffect<TLevel>,
      effectValue,
      hasAlternativeEffect: true,
      hasFixedEncumbrance: false,
    } as const;
  } else {
    return {
      condition,
      conditionLevel: conditionLevel as ConditionLevelBase<TLevel>,
      effectValue,
      hasAlternativeEffect: false,
      hasFixedEncumbrance: false,
    } as const;
  }
}

export type ConditionState = {
  id: ConditionId;
  level: ConditionLevelValue;
  isAlternativeEffect: boolean;
};

export function getTotalModifierForConditions({
  currentConditions,
  effectType,
  isEncumbranceApplicable,
}: {
  currentConditions: ConditionState[];
  effectType: EffectType;
  isEncumbranceApplicable: Skill["isEncumbranceApplicable"];
}) {
  const effectValues = currentConditions.map(
    ({ id, level, isAlternativeEffect }) => {
      if (level === 0) {
        return 0;
      }

      const info = getConditionInfo({
        conditionId: id,
        level,
        isAlternativeEffect,
        effectType,
        isEncumbranceApplicable,
      });

      return info.effectValue;
    }
  );

  let totalModifier: number = 0;
  let totalMultiplier: number = 1;
  let isIncapacitated = false;
  for (const effectValue of effectValues) {
    if (effectValue === "incapacitated") {
      isIncapacitated = true;
    }
    if (typeof effectValue === "number") {
      totalModifier += effectValue;
    }
    if (typeof effectValue === "string" && effectValue.startsWith("*")) {
      totalMultiplier *= Number.parseFloat(effectValue.slice(1));
    }
  }

  return {
    totalModifier,
    totalMultiplier,
    isIncapacitated,
  };
}
