import { useCallback, useState } from "react";
import { _3D20 } from "./dice";
import {
  calculateChance,
  getSkillCheckResult,
  SkillCheckChance,
  SkillCheckResult,
} from "./skillCheck";
import { Skill } from "./skills";

export function useLogs() {
  const [logs, setLogs] = useState<Log>([
    {
      type: "message",
      id: "1",
      createdAt: new Date(1713090868233),
      message:
        "Dies ist der Chat. Hier werden alle Aktionen und Ereignisse protokolliert. Schreibe eine Nachricht, oder wähle ein Talent aus, um eine Probe zu machen. Eine Probe könnte z.B. so aussehen:",
    },
    {
      type: "skillCheck",
      id: "2",
      createdAt: new Date(1713090868300),
      characterId: "1",
      skillId: 5,
      attributeValues: [14, 14, 14],
      skillPoints: 6,
      modifier: -4,
      modifierComponents: {
        difficulty: 0,
        specialAbilities: 0,
        encumbrance: 0,
        confusion: 0,
        fear: 0,
        pain: 0,
        paralysis: 0,
        rapture: 0,
        stupor: 0,
      },
      chance: calculateChance([14, 14, 14], 6, -4),
      rolls: [1, 15, 8],
      result: getSkillCheckResult([1, 15, 8], [14, 14, 14], 6, -4),
    },
  ]);

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
