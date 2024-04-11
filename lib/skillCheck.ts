type Rolls = readonly [number, number, number];
type Attributes = [number, number, number];

const is20 = (roll: number) => roll === 20;
const is1 = (roll: number) => roll === 1;

const isSpectacularFail = (rolls: Rolls) => rolls.filter(is20).length === 3;
const isCriticalFail = (rolls: Rolls) => rolls.filter(is20).length === 2;

const isSpectacularSuccess = (rolls: Rolls) => rolls.filter(is1).length === 3;
const isCriticalSuccess = (rolls: Rolls) => rolls.filter(is1).length === 2;

const getQualityLevel = (remainingSkillPoints: number) =>
  remainingSkillPoints >= 0
    ? Math.max(Math.min(Math.ceil(remainingSkillPoints / 3), 6), 1)
    : null;

// #region Remaining SP
const getRemainingSkillPoints = (
  rolls: Rolls,
  attributes: Attributes,
  skillPoints: number,
  modifier: number
) => {
  if (isSpectacularFail(rolls) || isCriticalFail(rolls)) {
    return -Infinity;
  } else if (isSpectacularSuccess(rolls) || isCriticalSuccess(rolls)) {
    return skillPoints;
  }

  let remainingSkillPoints = skillPoints;
  for (const [index, roll] of rolls.entries()) {
    const attribute = attributes[index];
    const modifiedAttribute = attribute + modifier;
    if (roll > modifiedAttribute) {
      remainingSkillPoints = remainingSkillPoints - (roll - modifiedAttribute);
    }
  }
  return remainingSkillPoints;
};

export function calculateChance(
  attributes: Attributes,
  skillPoints: number,
  modifier: number
) {
  let successCount = 0;
  const achievedQualityLevelCounts = [0, 0, 0, 0, 0, 0];

  for (let d1 = 1; d1 <= 20; d1++) {
    for (let d2 = 1; d2 <= 20; d2++) {
      for (let d3 = 1; d3 <= 20; d3++) {
        const rolls = [d1, d2, d3] as Rolls;
        const remainingSkillPoints = getRemainingSkillPoints(
          rolls,
          attributes,
          skillPoints,
          modifier
        );
        if (remainingSkillPoints >= 0) {
          achievedQualityLevelCounts[
            getQualityLevel(remainingSkillPoints)! - 1
          ]++;
          successCount++;
        }
      }
    }
  }
  return [
    successCount / 8000,
    achievedQualityLevelCounts.map(
      (achievedQualityLevelCount) => achievedQualityLevelCount / 8000
    ) as [number, number, number, number, number, number],
  ] as const;
}

export type SkillCheckChance = ReturnType<typeof calculateChance>;

// #region Skill Check
type SkillCheckPart = {
  roll: number;
  attribute: number;
  modifiedAttribute: number;
  usedSkillPoints: number;
  remainingSkillPoints: number;
  isSuccess: boolean;
};

type SkillCheckResultSuccess = {
  type: "success";
  parts: [SkillCheckPart, SkillCheckPart, SkillCheckPart];
  isSuccess: true;
  qualityLevel: number;
};

type SkillCheckResultFail = {
  type: "fail";
  parts: [SkillCheckPart, SkillCheckPart, SkillCheckPart];
  isSuccess: false;
  qualityLevel: null;
};

type SkillCheckResultSpectacularSuccess = {
  type: "spectacularSuccess";
  parts: never;
  isSuccess: true;
  qualityLevel: number;
};

type SkillCheckResultSpectacularFail = {
  type: "spectacularFail";
  parts: never;
  isSuccess: false;
  qualityLevel: null;
};

type SkillCheckResultCriticalSuccess = {
  type: "criticalSuccess";
  parts: never;
  isSuccess: true;
  qualityLevel: number;
};

type SkillCheckResultCriticalFail = {
  type: "criticalFail";
  parts: never;
  isSuccess: false;
  qualityLevel: null;
};

export type SkillCheckResult =
  | SkillCheckResultSuccess
  | SkillCheckResultFail
  | SkillCheckResultSpectacularSuccess
  | SkillCheckResultSpectacularFail
  | SkillCheckResultCriticalSuccess
  | SkillCheckResultCriticalFail;

export const getSkillCheckResult = (
  rolls: Rolls,
  attributes: Attributes,
  skillPoints: number,
  modifier: number
) => {
  if (isSpectacularFail(rolls)) {
    return {
      type: "spectacularFail",
      isSuccess: false,
      qualityLevel: null,
    } as SkillCheckResultSpectacularFail;
  } else if (isCriticalFail(rolls)) {
    return {
      type: "criticalFail",
      isSuccess: false,
      qualityLevel: null,
    } as SkillCheckResultCriticalFail;
  } else if (isSpectacularSuccess(rolls)) {
    return {
      type: "spectacularSuccess",
      isSuccess: true,
      qualityLevel: getQualityLevel(skillPoints),
    } as SkillCheckResultSpectacularSuccess;
  } else if (isCriticalSuccess(rolls)) {
    return {
      type: "criticalSuccess",
      isSuccess: true,
      qualityLevel: getQualityLevel(skillPoints),
    } as SkillCheckResultCriticalSuccess;
  }

  let remainingSkillPoints = skillPoints;
  let parts: SkillCheckPart[] = [];

  for (const [index, roll] of rolls.entries()) {
    const attribute = attributes[index];
    const modifiedAttribute = attribute + modifier;
    if (roll > modifiedAttribute) {
      remainingSkillPoints = remainingSkillPoints - (roll - modifiedAttribute);
      if (remainingSkillPoints >= 0) {
        parts.push({
          roll,
          attribute,
          modifiedAttribute,
          usedSkillPoints: roll - modifiedAttribute,
          remainingSkillPoints,
          isSuccess: true,
        });
      } else {
        parts.push({
          roll,
          attribute,
          modifiedAttribute,
          usedSkillPoints: roll - modifiedAttribute,
          remainingSkillPoints,
          isSuccess: false,
        });
      }
    } else {
      parts.push({
        roll,
        attribute,
        modifiedAttribute,
        usedSkillPoints: 0,
        remainingSkillPoints,
        isSuccess: true,
      });
    }
  }

  if (remainingSkillPoints >= 0) {
    return {
      parts,
      type: "success",
      isSuccess: true,
      qualityLevel: getQualityLevel(remainingSkillPoints)!,
    } as SkillCheckResultSuccess;
  }

  return {
    parts,
    type: "fail",
    isSuccess: false,
    qualityLevel: null,
  } as SkillCheckResultFail;
};
