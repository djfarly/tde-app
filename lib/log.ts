import { useCallback, useState } from "react";
import { _3D20 } from "./dice";
import { SkillCheckChance, SkillCheckResult } from "./skillCheck";
import { Skill } from "./skills";

export function useLogs() {
  const [logs, setLogs] = useState<Log>([]);

  const addLogEntry = useCallback((entry: LogEntry) => {
    setLogs((logs) =>
      [...logs, entry].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      )
    );
  }, []);

  return { logs, addLogEntry };
}

export type Log = LogEntry[];

export type LogEntry = SkillCheckLogEntry | MessageLogEntry;

export type SkillCheckLogEntry = {
  type: "skillCheck";
  id: string;
  createdAt: Date;
  message?: string;
  characterId: string;
  // userId: string;
  skillId: Skill["id"];
  attributeValues: [number, number, number];
  skillPoints: number;
  modifier: number;
  modifierComponents: {
    difficulty: number;
    specialAbilities: number;
    encumbrance: 0 | -1 | -2 | -3;
    confusion: 0 | -1 | -2 | -3;
    fear: 0 | -1 | -2 | -3;
    pain: 0 | -1 | -2 | -3;
    paralysis: 0 | -1 | -2 | -3;
    rapture: 3 | 2 | 1 | 0 | -1 | -2 | -3 | -4;
    stupor: 0 | -1 | -2 | -3;
  };
  chance: SkillCheckChance;
  rolls: _3D20;
  result: SkillCheckResult;
};

export type MessageLogEntry = {
  type: "message";
  id: string;
  createdAt: Date;
  message: string;
  // userId: string;
};
