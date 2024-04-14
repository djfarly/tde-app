import { Attribute, Attributes } from "@/app/Attribute";
import { IconD20 } from "@/app/IconD20";
import { QualityLevelBadge } from "@/app/QualityLevelBadge";
import { formatNumberAsModifier } from "@/lib/format";
import { SkillCheckLogEntry } from "@/lib/log";
import { skillCheckPartIndices, skillCheckResultName } from "@/lib/skillCheck";
import { skills } from "@/lib/skills";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { log } from "console";
import { ChevronRight } from "lucide-react";
import Marquee from "react-fast-marquee";

const locale = "de";

const chatLogSkillCheckVariants = cva(
  "rounded-lg px-4 py-4 flex flex-col items-center bg-gradient-to-b from-[-50%] to-[50%]",
  {
    variants: {
      sendBy: {
        me: "from-blue-400 to-blue-500 [--log-entry-bg:#3b82f6] text-white",
        other: "from-white to-slate-50 [--log-entry-bg:#f8fafc] text-black",
      },
    },
    defaultVariants: {
      sendBy: "other",
    },
  }
);

interface ChatLogEntryMessageProps
  extends VariantProps<typeof chatLogSkillCheckVariants> {
  logEntry: SkillCheckLogEntry;
}

export default function ChatLogEntrySkillCheck({
  logEntry,
  sendBy,
}: ChatLogEntryMessageProps) {
  const skill = skills.find(({ id }) => id === logEntry.skillId)!;

  return (
    <div className={chatLogSkillCheckVariants({ sendBy })}>
      <>
        <div className="opacity-60">Talentprobe</div>
        <div className="flex gap-2 items-baseline mb-2">
          <div className="font-semibold">
            {skills.find(({ id }) => id === logEntry.skillId)!.name[locale]}
          </div>
          {logEntry.modifier !== 0 ? (
            <div className="">{formatNumberAsModifier(logEntry.modifier)}</div>
          ) : null}
        </div>
        <div className="flex gap-1 items-center justify-center mb-px">
          {skillCheckPartIndices.map((part) => (
            <Attribute
              key={part}
              attributeId={skill.attributes[part]}
              attributeValue={logEntry.attributeValues[part]}
              modifier={logEntry.modifier}
              className="w-12 rounded-sm border border-border"
            />
          ))}
        </div>
        <div className="flex gap-1 items-center justify-center">
          {skillCheckPartIndices.map((part) => (
            <div key={part} className="w-12 flex justify-center">
              <IconD20
                side={logEntry.rolls[part]}
                attributeId={skill.attributes[part]}
              />
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="absolute inset-0 grid place-items-center">
            <Marquee direction="right" autoFill speed={10}>
              <ChevronRight
                className={cn(
                  "size-5 text-border mx-0.5",
                  sendBy === "me" ? "text-blue-400" : "text-slate-200"
                )}
              />
            </Marquee>
          </div>
          <div className="flex gap-1 items-center relative z-10">
            <div className="w-12 h-8 leading-8 text-center bg-muted text-muted-foreground border border-border rounded-sm">
              {logEntry?.skillPoints ?? "-"} FP
              {/* <ArrowRight className="absolute -right-2.5 fill-card top-[calc(50%-10px)] size-5 text-muted-foreground" /> */}
            </div>
            {skillCheckPartIndices.map((part) => {
              const usedSkillPoints =
                logEntry?.result.parts?.[part].usedSkillPoints;
              return (
                <div
                  key={part}
                  className="w-12 h-8 leading-8 text-center bg-gradient-to-r from-transparent via-[var(--log-entry-bg)] to-transparent from-15% to-85% empty:via-transparent"
                >
                  {usedSkillPoints && usedSkillPoints > 0
                    ? `-${usedSkillPoints}`
                    : null}
                </div>
              );
            })}
            <div
              className={cn(
                "w-12 h-8 leading-8 text-center bg-card border border-border rounded-sm bg-red-200 text-red-900",
                {
                  "bg-green-200 text-green-900":
                    (logEntry?.result.remainingSkillPoints ?? -1) >= 0,
                }
              )}
            >
              {/* <Equal className="absolute -left-2.5 fill-card top-[calc(50%-10px)] size-5 text-muted-foreground" /> */}
              {logEntry?.result.remainingSkillPoints ?? "–"} FP
            </div>
          </div>
        </div>
        <div className="text-2xl font-medium text-center mt-2">
          {skillCheckResultName[logEntry?.result.type!]?.[locale] ?? "–"}
        </div>
        <div className="flex justify-center">
          <QualityLevelBadge
            level={logEntry?.result.qualityLevel ?? 0}
            size="md"
          >
            Qualitätsstufe {logEntry?.result.qualityLevel ?? "–"}
          </QualityLevelBadge>
        </div>
        {/* {logEntry.result.type === "success" ? (
          <span className="text-xs">
            Peter hat eine Probe auf{" "}
            {skills.find(({ id }) => id === logEntry.skillId)!.name[locale]} mit
            QS {logEntry.result.qualityLevel} bestanden.
          </span>
        ) : (
          <span className="text-xs">
            Peter hat eine Probe auf{" "}
            {skills.find(({ id }) => id === logEntry.skillId)!.name[locale]}{" "}
            nicht bestanden.
          </span>
        )} */}
      </>
    </div>
  );
}
