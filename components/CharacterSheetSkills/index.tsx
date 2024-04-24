"use client";

import { Attributes } from "@/components/Attribute";
import { QualityLevelMeter } from "@/components/QualityLevelMeter";
import { SkillCheckDialog } from "@/components/SkillCheckDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttributeValues } from "@/lib/core/attributes";
import { getSkillPoints, skillGroups, skills } from "@/lib/core/skills";
import {
  Character,
  Game,
  MessageInsert,
  SkillCheckData,
  User,
} from "@/supabase/schema";
import { ShieldAlert, ShieldOff, ShieldQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCharacter } from "../CharacterProvider";

// temporary
const locale = "de";

export default function CharacterSheetSkills({
  onAddMessage,
  currentGameId,
  currentUserId,
}: {
  onAddMessage?: (message: MessageInsert) => Promise<void>;
  currentGameId: Game["id"];
  currentUserId: User["id"];
}) {
  const [activeSkillId, setActiveSkillId] = useState<number | null>(null);
  const character = useCharacter();

  const router = useRouter();

  async function handleCheck(
    skillCheckData: SkillCheckData,
    characterId: Character["id"]
  ) {
    await onAddMessage?.({
      gameId: currentGameId,
      userId: currentUserId,
      characterId,
      type: "skillCheck",
      data: skillCheckData,
    });

    router.refresh();
  }

  return (
    <>
      {activeSkillId ? (
        <SkillCheckDialog
          onCheck={handleCheck}
          skillId={activeSkillId}
          onClose={() => {
            setActiveSkillId(null);
          }}
        />
      ) : null}
      <Table className="mx-auto" variant="compact">
        <TableHeader>
          <TableRow>
            <TableHead>Talent</TableHead>
            <TableHead>Probe</TableHead>
            <TableHead>BE</TableHead>
            <TableHead>Fw</TableHead>
            <TableHead>%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => {
            const skillPoints = getSkillPoints(skill.id, character);
            const skillGroup = skillGroups.find(
              ({ id }) => id === skill.group
            )!;
            const GroupIcon = skillGroup.Icon;
            return (
              <TableRow
                key={skill.id}
                onClick={() => {
                  setActiveSkillId(skill.id);
                }}
              >
                <TableCell>
                  <div className="flex items-center">
                    <GroupIcon className="mr-4 size-5" />
                    <span className="text-base font-medium">
                      {skill.name[locale]}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Attributes
                    attributeIds={skill.attributes}
                    character={character}
                  />
                </TableCell>
                <TableCell>
                  {skill.isEncumbranceApplicable === "maybe" ? (
                    <ShieldQuestion className="size-5 text-stone-500" />
                  ) : skill.isEncumbranceApplicable ? (
                    <ShieldAlert className="size-5 text-stone-500" />
                  ) : (
                    <ShieldOff className="size-5 text-stone-300" />
                  )}
                </TableCell>
                {/* <TableCell>{skill.increaseFactor}</TableCell> */}
                <TableCell className="text-lg font-medium text-right tabular-nums">
                  {skillPoints}
                </TableCell>
                <TableCell>
                  <QualityLevelMeter
                    attributes={getAttributeValues(skill.attributes, character)}
                    skillPoints={skillPoints}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
