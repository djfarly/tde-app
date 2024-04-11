import {
  Brain,
  DraftingCompass,
  Eye,
  Feather,
  Ghost,
  HeartCrack,
  Leaf,
  LucideIcon,
  MessageCircle,
  PersonStanding,
  Shell,
  Shield,
  Snowflake,
} from "lucide-react";
import * as optolith from "./optolith";

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

export type SkillGroup = {
  id: "physical" | "social" | "nature" | "knowledge" | "craft";
  name: { en: string; de: string };
  Icon: LucideIcon;
  attributes: [Attribute["id"], Attribute["id"], Attribute["id"]];
};

export const skillGroups = [
  {
    id: "physical",
    name: { en: "Physical Skills", de: "Körpertalente" },
    Icon: PersonStanding,
    // MU/GE/KK
    attributes: [1, 6, 8],
  },
  {
    id: "social",
    name: { en: "Social Skills", de: "Gesellschaftstalente" },
    Icon: MessageCircle,
    // IN/CH/CH
    attributes: [3, 4, 4],
  },
  {
    id: "nature",
    name: { en: "Nature Skills", de: "Naturtalente" },
    Icon: Leaf,
    // MU/GE/KO
    attributes: [1, 6, 7],
  },
  {
    id: "knowledge",
    name: { en: "Knowledge Skills", de: "Wissenstalente" },
    Icon: Feather,
    // KL/KL/IN
    attributes: [2, 2, 3],
  },
  {
    id: "craft",
    name: { en: "Craft Skills", de: "Handwerkstalente" },
    Icon: DraftingCompass,
    // FF/FF/KO
    attributes: [5, 5, 7],
  },
] as const satisfies SkillGroup[];

export type IncreaseFactor = "A" | "B" | "C" | "D" | "E" | "F";

export type Skill = {
  id: number;
  optolithId: optolith.SkillId;
  name: { en: string; de: string };
  group: SkillGroup["id"];
  attributes: [Attribute["id"], Attribute["id"], Attribute["id"]];
  isEncumbranceApplicable: boolean | "maybe";
  increaseFactor: IncreaseFactor;
};

export const skills = [
  {
    id: 1,
    optolithId: optolith.SkillId.Flying,
    name: { en: "Flying", de: "Fliegen" },
    group: "physical",
    attributes: [1, 3, 6],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 2,
    optolithId: optolith.SkillId.Gaukelei,
    name: { en: "Gaukelei", de: "Gaukelei" },
    group: "physical",
    attributes: [1, 4, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 3,
    optolithId: optolith.SkillId.Climbing,
    name: { en: "Climbing", de: "Klettern" },
    group: "physical",
    attributes: [1, 6, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 4,
    optolithId: optolith.SkillId.BodyControl,
    name: { en: "Body Control", de: "Körperbeherrschung" },
    group: "physical",
    attributes: [6, 6, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "D",
  },
  {
    id: 5,
    optolithId: optolith.SkillId.FeatOfStrength,
    name: { en: "Feat of Strength", de: "Kraftakt" },
    group: "physical",
    attributes: [7, 8, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 6,
    optolithId: optolith.SkillId.Riding,
    name: { en: "Riding", de: "Reiten" },
    group: "physical",
    attributes: [4, 6, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 7,
    optolithId: optolith.SkillId.Swimming,
    name: { en: "Swimming", de: "Schwimmen" },
    group: "physical",
    attributes: [6, 7, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 8,
    optolithId: optolith.SkillId.SelfControl,
    name: { en: "Self-Control", de: "Selbstbeherrschung" },
    group: "physical",
    attributes: [1, 1, 7],
    isEncumbranceApplicable: false,
    increaseFactor: "D",
  },
  {
    id: 9,
    optolithId: optolith.SkillId.Singing,
    name: { en: "Singing", de: "Singen" },
    group: "physical",
    attributes: [2, 4, 7],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "A",
  },
  {
    id: 10,
    optolithId: optolith.SkillId.Perception,
    name: { en: "Perception", de: "Sinnesschärfe" },
    group: "physical",
    attributes: [2, 3, 3],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "D",
  },
  {
    id: 11,
    optolithId: optolith.SkillId.Dancing,
    name: { en: "Dancing", de: "Tanzen" },
    group: "physical",
    attributes: [2, 4, 6],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 12,
    optolithId: optolith.SkillId.Pickpocket,
    name: { en: "Pickpocket", de: "Taschendiebstahl" },
    group: "physical",
    attributes: [1, 5, 6],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 13,
    optolithId: optolith.SkillId.Stealth,
    name: { en: "Stealth", de: "Verbergen" },
    group: "physical",
    attributes: [1, 3, 6],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 14,
    optolithId: optolith.SkillId.Carousing,
    name: { en: "Carousing", de: "Zechen" },
    group: "physical",
    attributes: [1, 7, 8],
    isEncumbranceApplicable: false,
    increaseFactor: "A",
  },
  {
    id: 15,
    optolithId: optolith.SkillId.Persuasion,
    name: { en: "Persuasion", de: "Bekehren & Überzeugen" },
    group: "social",
    attributes: [1, 2, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 16,
    optolithId: optolith.SkillId.Seduction,
    name: { en: "Seduction", de: "Betören" },
    group: "social",
    attributes: [1, 4, 4],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "B",
  },
  {
    id: 17,
    optolithId: optolith.SkillId.Intimidation,
    name: { en: "Intimidation", de: "Einschüchtern" },
    group: "social",
    attributes: [1, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 18,
    optolithId: optolith.SkillId.Etiquette,
    name: { en: "Etiquette", de: "Etikette" },
    group: "social",
    attributes: [2, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 19,
    optolithId: optolith.SkillId.Streetwise,
    name: { en: "Streetwise", de: "Gassenwissen" },
    group: "social",
    attributes: [2, 3, 4],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "C",
  },
  {
    id: 20,
    optolithId: optolith.SkillId.Empathy,
    name: { en: "Empathy", de: "Menschenkenntnis" },
    group: "social",
    attributes: [2, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "C",
  },
  {
    id: 21,
    optolithId: optolith.SkillId.FastTalk,
    name: { en: "Fast Talk", de: "Überreden" },
    group: "social",
    attributes: [1, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "C",
  },
  {
    id: 22,
    optolithId: optolith.SkillId.Disguise,
    name: { en: "Disguise", de: "Verkleiden" },
    group: "social",
    attributes: [3, 4, 6],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 23,
    optolithId: optolith.SkillId.Willpower,
    name: { en: "Willpower", de: "Willenskraft" },
    group: "social",
    attributes: [1, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "D",
  },
  {
    id: 24,
    optolithId: optolith.SkillId.Tracking,
    name: { en: "Tracking", de: "Fährtensuchen" },
    group: "nature",
    attributes: [1, 3, 4],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 25,
    optolithId: optolith.SkillId.Ropes,
    name: { en: "Ropes", de: "Fesseln" },
    group: "nature",
    attributes: [2, 5, 8],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "A",
  },
  {
    id: 26,
    optolithId: optolith.SkillId.Fishing,
    name: { en: "Fishing", de: "Fischen & Angeln" },
    group: "nature",
    attributes: [5, 6, 7],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "A",
  },
  {
    id: 27,
    optolithId: optolith.SkillId.Orienting,
    name: { en: "Orienting", de: "Orientierung" },
    group: "nature",
    attributes: [2, 3, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 28,
    optolithId: optolith.SkillId.PlantLore,
    name: { en: "Plant Lore", de: "Pflanzenkunde" },
    group: "nature",
    attributes: [2, 5, 7],
    isEncumbranceApplicable: "maybe",
    increaseFactor: "C",
  },
  {
    id: 29,
    optolithId: optolith.SkillId.AnimalLore,
    name: { en: "Animal Lore", de: "Tierkunde" },
    group: "nature",
    attributes: [1, 1, 4],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 30,
    optolithId: optolith.SkillId.Survival,
    name: { en: "Survival", de: "Wildnisleben" },
    group: "nature",
    attributes: [1, 6, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 31,
    optolithId: optolith.SkillId.Gambling,
    name: { en: "Gambling", de: "Brett- & Glücksspiel" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "A",
  },
  {
    id: 32,
    optolithId: optolith.SkillId.Geography,
    name: { en: "Geography", de: "Geographie" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 33,
    optolithId: optolith.SkillId.History,
    name: { en: "History", de: "Geschichtswissen" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 34,
    optolithId: optolith.SkillId.Religions,
    name: { en: "Religions", de: "Götter & Kulte" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },

  {
    id: 35,
    optolithId: optolith.SkillId.Warfare,
    name: { en: "Warfare", de: "Kriegskunst" },
    group: "knowledge",
    attributes: [1, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 36,
    optolithId: optolith.SkillId.MagicalLore,
    name: { en: "Magical Lore", de: "Magiekunde" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "C",
  },
  {
    id: 37,
    optolithId: optolith.SkillId.Mechanics,
    name: { en: "Mechanics", de: "Mechanik" },
    group: "knowledge",
    attributes: [2, 2, 5],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 38,
    optolithId: optolith.SkillId.Math,
    name: { en: "Math", de: "Rechnen" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "A",
  },
  {
    id: 39,
    optolithId: optolith.SkillId.Law,
    name: { en: "Law", de: "Rechtskunde" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "A",
  },
  {
    id: 40,
    optolithId: optolith.SkillId.MythsAndLegends,
    name: { en: "Myths and Legends", de: "Sagen & Legenden" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 41,
    optolithId: optolith.SkillId.SphereLore,
    name: { en: "Sphere Lore", de: "Sphärenkunde" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 42,
    optolithId: optolith.SkillId.Astronomy,
    name: { en: "Astronomy", de: "Sternkunde" },
    group: "knowledge",
    attributes: [2, 2, 3],
    isEncumbranceApplicable: false,
    increaseFactor: "A",
  },
  {
    id: 43,
    optolithId: optolith.SkillId.Alchemy,
    name: { en: "Alchemy", de: "Alchemie" },
    group: "craft",
    attributes: [1, 2, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 44,
    optolithId: optolith.SkillId.Sailing,
    name: { en: "Sailing", de: "Boote & Schiffe" },
    group: "craft",
    attributes: [5, 6, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 45,
    optolithId: optolith.SkillId.Driving,
    name: { en: "Driving", de: "Fahrzeuge" },
    group: "craft",
    attributes: [4, 5, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 46,
    optolithId: optolith.SkillId.Commerce,
    name: { en: "Commerce", de: "Handel" },
    group: "craft",
    attributes: [2, 3, 4],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 47,
    optolithId: optolith.SkillId.TreatPoison,
    name: { en: "Treat Poison", de: "Heilkunde Gift" },
    group: "craft",
    attributes: [1, 2, 3],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 48,
    optolithId: optolith.SkillId.TreatDisease,
    name: { en: "Treat Disease", de: "Heilkunde Krankheiten" },
    group: "craft",
    attributes: [1, 3, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 49,
    optolithId: optolith.SkillId.TreatSoul,
    name: { en: "Treat Soul", de: "Heilkunde Seele" },
    group: "craft",
    attributes: [1, 4, 7],
    isEncumbranceApplicable: false,
    increaseFactor: "B",
  },
  {
    id: 50,
    optolithId: optolith.SkillId.TreatWounds,
    name: { en: "Treat Wounds", de: "Heilkunde Wunden" },
    group: "craft",
    attributes: [2, 5, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "D",
  },
  {
    id: 51,
    optolithId: optolith.SkillId.Woodworking,
    name: { en: "Woodworking", de: "Holzbearbeitung" },
    group: "craft",
    attributes: [5, 6, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 52,
    optolithId: optolith.SkillId.PrepareFood,
    name: { en: "Prepare Food", de: "Lebensmittelbearbeitung" },
    group: "craft",
    attributes: [3, 5, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 53,
    optolithId: optolith.SkillId.Leatherworking,
    name: { en: "Leatherworking", de: "Lederbearbeitung" },
    group: "craft",
    attributes: [5, 6, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "B",
  },
  {
    id: 54,
    optolithId: optolith.SkillId.ArtisticAbility,
    name: { en: "Artistic Ability", de: "Malen & Zeichnen" },
    group: "craft",
    attributes: [3, 5, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 55,
    optolithId: optolith.SkillId.Metalworking,
    name: { en: "Metalworking", de: "Metallbearbeitung" },
    group: "craft",
    attributes: [5, 7, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 56,
    optolithId: optolith.SkillId.Music,
    name: { en: "Music", de: "Musizieren" },
    group: "craft",
    attributes: [4, 5, 7],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 57,
    optolithId: optolith.SkillId.PickLocks,
    name: { en: "Pick Locks", de: "Schlösserknacken" },
    group: "craft",
    attributes: [3, 5, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "C",
  },
  {
    id: 58,
    optolithId: optolith.SkillId.Earthencraft,
    name: { en: "Earthencraft", de: "Steinbearbeitung" },
    group: "craft",
    attributes: [5, 5, 8],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
  {
    id: 59,
    optolithId: optolith.SkillId.Clothworking,
    name: { en: "Clothworking", de: "Stoffbearbeitung" },
    group: "craft",
    attributes: [2, 5, 5],
    isEncumbranceApplicable: true,
    increaseFactor: "A",
  },
] as const satisfies Skill[];
