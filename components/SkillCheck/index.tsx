"use client";

import { attributes, conditions, skills } from "@/lib/skills";
import { ComponentProps, ReactNode, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import testChar from "@/lib/chars/faffi.json";
import { getTotalModifierForConditions } from "@/lib/core/conditions";
import { formatNumberAsModifier } from "@/lib/format";
import { LogEntry, SkillCheckLogEntry } from "@/lib/log";
import { performSkillCheck } from "@/lib/performCheck";
import { skillCheckPartIndices, skillCheckResultName } from "@/lib/skillCheck";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { ActivateConditionMenu } from "@/app/ActivateConditionMenu";
import { Attribute } from "@/app/Attribute";
import { Chance } from "@/app/Chance";
import { ConditionInput } from "@/app/ConditionInput";
import { ModifierInput } from "@/app/ModifierInput";
import { QualityLevelBadge } from "@/app/QualityLevelBadge";
import { RollableD20 } from "@/app/RollableD20";
import { D20 } from "@/lib/dice";
import { IconD20 } from "@/app/IconD20";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const locale = "de";

function SkillCheckColumns({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-1 items-center justify-center w-max relative z-10">
      {children}
    </div>
  );
}

export function SkillCheckAttributes({
  skillId,
  modifier,
  width,
}: {
  skillId: number;
  modifier: number;
  width?: 16 | 12;
}) {
  const skill = skills.find(({ id }) => id === skillId)!;

  return (
    <SkillCheckColumns>
      {skillCheckPartIndices.map((part) => (
        <Attribute
          key={part}
          attributeId={skill.attributes[part]}
          modifier={modifier}
          className={cn({
            "w-12": width === 12,
            "w-16": width === 16,
          })}
        />
      ))}
    </SkillCheckColumns>
  );
}

export function SkillCheck3D20Rollable({
  skillId,
  skillCheckLogEntry,
}: {
  skillId: number;
  skillCheckLogEntry?: SkillCheckLogEntry;
}) {
  const skill = skills.find(({ id }) => id === skillId)!;

  return (
    <SkillCheckColumns>
      {skillCheckPartIndices.map((part) => (
        <RollableD20
          key={part}
          dieIndex={part}
          side={skillCheckLogEntry?.rolls[part]}
          attributeId={skill.attributes[part]}
        />
      ))}
    </SkillCheckColumns>
  );
}

export function SkillCheck3D20({
  skillCheckLogEntry,
  width,
}: {
  skillCheckLogEntry: SkillCheckLogEntry;
  width?: 16 | 12;
}) {
  const skill = skills.find(({ id }) => id === skillCheckLogEntry.skillId)!;

  return (
    <SkillCheckColumns>
      {skillCheckPartIndices.map((part) => (
        <div
          key={part}
          className={cn("flex justify-center", {
            "w-12": width === 12,
            "w-16": width === 16,
          })}
        >
          <IconD20
            side={skillCheckLogEntry?.rolls[part]}
            attributeId={skill.attributes[part]}
          />
        </div>
      ))}
    </SkillCheckColumns>
  );
}

export function SkillCheckSkillPointBreakdown({
  skillCheckLogEntry,
  width,
  marqueeClassName,
  collisionBoundary,
}: {
  skillCheckLogEntry?: SkillCheckLogEntry;
  width?: 16 | 12;
  marqueeClassName?: string;
  collisionBoundary?: ComponentProps<
    typeof TooltipContent
  >["collisionBoundary"];
}) {
  return (
    <div className="relative w-max mx-auto">
      <div className="absolute inset-0 grid place-items-center">
        <Marquee direction="right" autoFill speed={10}>
          <ChevronRight
            className={cn("text-slate-200 size-5 mx-0.5", marqueeClassName)}
          />
        </Marquee>
      </div>
      <SkillCheckColumns>
        <div
          className={cn(
            "h-8 leading-8 text-center bg-card text-card-foreground border border-border rounded-sm",
            {
              "w-12": width === 12,
              "w-16": width === 16,
            }
          )}
        >
          Fw {skillCheckLogEntry?.skillPoints ?? "-"}
        </div>
        {skillCheckPartIndices.map((part) => {
          const usedSkillPoints =
            skillCheckLogEntry?.result.parts?.[part].usedSkillPoints;
          return (
            <div
              key={part}
              className={cn(
                "h-8 leading-8 text-center bg-gradient-to-r from-transparent via-[var(--log-entry-bg,white)] to-transparent from-15% to-85% empty:via-transparent",
                {
                  "w-12": width === 12,
                  "w-16": width === 16,
                }
              )}
            >
              {usedSkillPoints && usedSkillPoints > 0
                ? `-${usedSkillPoints}`
                : null}
            </div>
          );
        })}
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "h-8 leading-8 text-center bg-card border border-border rounded-sm border-rose-400 bg-rose-500 text-rose-50",
                {
                  "border-emerald-400 bg-emerald-500 text-emerald-50":
                    (skillCheckLogEntry?.result.remainingSkillPoints ?? -1) >=
                    0,
                  "w-12": width === 12,
                  "w-16": width === 16,
                }
              )}
            >
              {skillCheckLogEntry?.result.remainingSkillPoints ?? "–"} FP
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="p-0"
            collisionBoundary={collisionBoundary}
          >
            <QualityLevelTable />
          </TooltipContent>
        </Tooltip>
      </SkillCheckColumns>
    </div>
  );
}

function QualityLevelTable() {
  /*
    FP	QS
    0–3	1
    4–6	2
    7–9	3
    10–12	4
    13–15	5
    16+	6
  */

  return (
    <Table variant="compact" className="tabular-nums text-center">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            FP
            <br />
            <span className="text-xs">Fertigkeitspunkte</span>
          </TableHead>
          <TableHead className="text-center">
            QS
            <br />
            <span className="text-xs">Qualitätsstufe</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>0-3</TableCell>
          <TableCell>1</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>4-6</TableCell>
          <TableCell>2</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>7-9</TableCell>
          <TableCell>3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>10-12</TableCell>
          <TableCell>4</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>13-15</TableCell>
          <TableCell>5</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>16+</TableCell>
          <TableCell>6</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export function SkillCheckResult({
  skillCheckLogEntry,
  size = "md",
}: {
  skillCheckLogEntry?: SkillCheckLogEntry;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div
        className={cn("font-medium text-center mt-2", {
          "text-2xl": size === "md",
          "text-3xl": size === "lg",
          "animate-head-shake delay-100":
            skillCheckLogEntry?.result.isSuccess === false,
          "animate-tada delay-100":
            skillCheckLogEntry?.result.isSuccess === true,
        })}
      >
        {skillCheckResultName[skillCheckLogEntry?.result.type!]?.[locale] ??
          "–"}
      </div>
      <div className="flex justify-center">
        <QualityLevelBadge
          level={skillCheckLogEntry?.result.qualityLevel ?? 0}
          size={size}
        >
          Qualitätsstufe {skillCheckLogEntry?.result.qualityLevel ?? "–"}
        </QualityLevelBadge>
      </div>
    </div>
  );
}
