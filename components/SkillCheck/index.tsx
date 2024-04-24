"use client";

import { Attribute } from "@/components/Attribute";
import { D20 } from "@/components/D20";
import { D20Rollable } from "@/components/D20Rollable";
import { QualityLevelBadge } from "@/components/QualityLevelBadge";
import { skillCheckPartIndices, skillCheckResultName } from "@/lib/skillCheck";
import { skills } from "@/lib/core/skills";
import { cn } from "@/lib/utils";
import { SkillCheckData } from "@/supabase/schema";
import { ChevronRight } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import Marquee from "react-fast-marquee";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { getAttributeValues } from "@/lib/core/attributes";

const locale = "de";

function SkillCheckColumns({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 flex items-center justify-center gap-1 w-max">
      {children}
    </div>
  );
}

export function SkillCheckAttributes({
  skillId,
  modifier,
  width,
  attributeValues,
}: {
  skillId: number;
  modifier: number;
  width?: 16 | 12;
  attributeValues: [number, number, number];
}) {
  const skill = skills.find(({ id }) => id === skillId)!;

  return (
    <SkillCheckColumns>
      {skillCheckPartIndices.map((part) => (
        <Attribute
          key={part}
          attributeId={skill.attributes[part]}
          attributeValue={attributeValues[part]}
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
  skillCheckData,
}: {
  skillId: number;
  skillCheckData?: SkillCheckData;
}) {
  const skill = skills.find(({ id }) => id === skillId)!;

  return (
    <SkillCheckColumns>
      {skillCheckPartIndices.map((part) => (
        <D20Rollable
          key={part}
          dieIndex={part}
          side={skillCheckData?.rolls[part]}
          attributeId={skill.attributes[part]}
        />
      ))}
    </SkillCheckColumns>
  );
}

export function SkillCheck3D20({
  skillCheckData,
  width,
}: {
  skillCheckData: SkillCheckData;
  width?: 16 | 12;
}) {
  const skill = skills.find(({ id }) => id === skillCheckData.skillId)!;

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
          <D20
            side={skillCheckData?.rolls[part]}
            attributeId={skill.attributes[part]}
          />
        </div>
      ))}
    </SkillCheckColumns>
  );
}

export function SkillCheckSkillPointBreakdown({
  skillCheckData,
  width,
  marqueeClassName,
  collisionBoundary,
}: {
  skillCheckData?: SkillCheckData;
  width?: 16 | 12;
  marqueeClassName?: string;
  collisionBoundary?: ComponentProps<
    typeof TooltipContent
  >["collisionBoundary"];
}) {
  return (
    <div className="relative mx-auto w-max">
      <div className="absolute inset-0 grid place-items-center">
        <Marquee direction="right" autoFill speed={10}>
          <ChevronRight
            className={cn("text-stone-200 size-5 mx-0.5", marqueeClassName)}
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
          Fw {skillCheckData?.skillPoints ?? "-"}
        </div>
        {skillCheckPartIndices.map((part) => {
          const usedSkillPoints =
            skillCheckData?.result.parts?.[part].usedSkillPoints;
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
                    (skillCheckData?.result.remainingSkillPoints ?? -1) >= 0,
                  "w-12": width === 12,
                  "w-16": width === 16,
                }
              )}
            >
              {skillCheckData?.result.remainingSkillPoints ?? "–"} FP
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
    <Table variant="compact" className="text-center tabular-nums">
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
  skillCheckData,
  size = "md",
}: {
  skillCheckData?: SkillCheckData;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <div
        className={cn("font-medium text-center mt-2", {
          "text-2xl": size === "md",
          "text-3xl": size === "lg",
          "animate-head-shake delay-100":
            skillCheckData?.result.isSuccess === false,
          "animate-tada delay-100": skillCheckData?.result.isSuccess === true,
        })}
      >
        {skillCheckResultName[skillCheckData?.result.type!]?.[locale] ?? "–"}
      </div>
      <div className="flex justify-center">
        <QualityLevelBadge
          level={skillCheckData?.result.qualityLevel ?? 0}
          size={size}
        >
          Qualitätsstufe {skillCheckData?.result.qualityLevel ?? "–"}
        </QualityLevelBadge>
      </div>
    </div>
  );
}
