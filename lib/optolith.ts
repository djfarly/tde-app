export enum SkillId {
  Flying = "TAL_1",
  Gaukelei = "TAL_2",
  Climbing = "TAL_3",
  BodyControl = "TAL_4",
  FeatOfStrength = "TAL_5",
  Riding = "TAL_6",
  Swimming = "TAL_7",
  SelfControl = "TAL_8",
  Singing = "TAL_9",
  Perception = "TAL_10",
  Dancing = "TAL_11",
  Pickpocket = "TAL_12",
  Stealth = "TAL_13",
  Carousing = "TAL_14",
  Persuasion = "TAL_15",
  Seduction = "TAL_16",
  Intimidation = "TAL_17",
  Etiquette = "TAL_18",
  Streetwise = "TAL_19",
  Empathy = "TAL_20",
  FastTalk = "TAL_21",
  Disguise = "TAL_22",
  Willpower = "TAL_23",
  Tracking = "TAL_24",
  Ropes = "TAL_25",
  Fishing = "TAL_26",
  Orienting = "TAL_27",
  PlantLore = "TAL_28",
  AnimalLore = "TAL_29",
  Survival = "TAL_30",
  Gambling = "TAL_31",
  Geography = "TAL_32",
  History = "TAL_33",
  Religions = "TAL_34",
  Warfare = "TAL_35",
  MagicalLore = "TAL_36",
  Mechanics = "TAL_37",
  Math = "TAL_38",
  Law = "TAL_39",
  MythsAndLegends = "TAL_40",
  SphereLore = "TAL_41",
  Astronomy = "TAL_42",
  Alchemy = "TAL_43",
  Sailing = "TAL_44",
  Driving = "TAL_45",
  Commerce = "TAL_46",
  TreatPoison = "TAL_47",
  TreatDisease = "TAL_48",
  TreatSoul = "TAL_49",
  TreatWounds = "TAL_50",
  Woodworking = "TAL_51",
  PrepareFood = "TAL_52",
  Leatherworking = "TAL_53",
  ArtisticAbility = "TAL_54",
  Metalworking = "TAL_55",
  Music = "TAL_56",
  PickLocks = "TAL_57",
  Earthencraft = "TAL_58",
  Clothworking = "TAL_59",
}

export enum AttributeId {
  Courage = "ATTR_1",
  Sagacity = "ATTR_2",
  Intuition = "ATTR_3",
  Charisma = "ATTR_4",
  Dexterity = "ATTR_5",
  Agility = "ATTR_6",
  Constitution = "ATTR_7",
  Strength = "ATTR_8",
}

export interface CharacterData {
  clientVersion: string;
  dateCreated: string;
  dateModified: string;
  id: string;
  phase: number;
  name: string;
  ap: { total: number };
  el: string;
  r: string;
  rv: string;
  c: string;
  p: string;
  professionName?: string;
  sex: string;
  pers: {
    placeofbirth: string;
    haircolor: number;
    eyecolor: number;
    size: string;
    weight: string;
    socialstatus: number;
  };
  attr: { values: { id: AttributeId; value: number }[] };
  activatable: Record<string, Record<string, number | string>[]>;
  talents: Partial<Record<SkillId, number>>;
  ct: Record<string, number>;
  spells: Record<string, number>;
  cantrips: string[];
  liturgies: Record<string, number>;
  blessings: string[];
  belongings: {
    items: Record<
      string,
      {
        id: string;
        name: string;
        amount: number;
        gr?: number;
        weight?: number;
        price?: number;
        [key: string]: unknown;
      }
    >;
    armorZones: Record<string, unknown>;
  };
  rules: {
    higherParadeValues: number;
    attributeValueLimit: boolean;
    enableAllRuleBooks: boolean;
    enabledRuleBooks: unknown[];
    enableLanguageSpecializations: boolean;
  };
  pets: Record<string, unknown>;
}
