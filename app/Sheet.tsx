"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { attributes, skillGroups, skills } from "@/lib/skills";
import { Fragment, memo, useState } from "react";

import { Button } from "@/components/ui/button";
import testChar from "@/lib/chars/faffi.json";
import { performSkillCheck } from "@/lib/performCheck";
import { Dices, ShieldAlert, ShieldOff, ShieldQuestion } from "lucide-react";
import { toast } from "sonner";
import { LogEntry, useLogs } from "@/lib/log";
import { Attribute, Attributes } from "./Attribute";
import { SkillCheckDialog } from "./SkillCheckDialog";
import { Chance } from "./Chance";

// temporary
const locale = "de";

export function formatAsPercentage(value: number) {
  return value.toLocaleString("de-DE", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

function getAttributeValue(attributeId: number) {
  return testChar.attr.values.find(
    ({ id }) =>
      id === attributes.find(({ id }) => id === attributeId)!.optolithId
  )!.value;
}

function getAttributeValues(attributeIds: [number, number, number]) {
  return attributeIds.map((attributeId) => getAttributeValue(attributeId)) as [
    number,
    number,
    number
  ];
}

export function Sheet({
  onAddLogEntry,
}: {
  onAddLogEntry: (entry: LogEntry) => void;
}) {
  const [activeSkillId, setActiveSkillId] = useState<number | null>(null);

  return (
    <>
      {activeSkillId ? (
        <SkillCheckDialog
          onAddLogEntry={onAddLogEntry}
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
            {/* <TableHead>Sf</TableHead> */}
            <TableHead>Fw</TableHead>
            <TableHead>%</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => {
            const skillPoints =
              testChar.talents[
                skill.optolithId as keyof typeof testChar.talents
              ] ?? 0;
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
                    <GroupIcon className="size-5 mr-4" />
                    <span className="font-medium">{skill.name[locale]}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Attributes attributes={skill.attributes} />
                </TableCell>
                <TableCell>
                  {skill.isEncumbranceApplicable === "maybe" ? (
                    <ShieldQuestion className="size-5 text-slate-700" />
                  ) : skill.isEncumbranceApplicable ? (
                    <ShieldAlert className="size-5 text-slate-700" />
                  ) : (
                    <ShieldOff className="size-5 text-slate-300" />
                  )}
                </TableCell>
                {/* <TableCell>{skill.increaseFactor}</TableCell> */}
                <TableCell className="text-right">
                  <span className="font-medium tabular-nums">
                    {skillPoints}
                  </span>
                </TableCell>
                <TableCell>
                  <Chance
                    attributes={getAttributeValues(skill.attributes)}
                    skillPoints={skillPoints}
                  />
                </TableCell>
                <TableCell>–</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
