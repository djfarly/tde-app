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
import {
  SkillCheckSkillPointBreakdown,
  SkillCheckResult,
  SkillCheck3D20,
  SkillCheckAttributes,
} from "../SkillCheck";

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
      <div className="opacity-60">Talentprobe</div>
      <div className="flex gap-2 items-baseline mb-2">
        <div className="font-semibold">
          {skills.find(({ id }) => id === logEntry.skillId)!.name[locale]}
        </div>
        {logEntry.modifier !== 0 ? (
          <div className="">{formatNumberAsModifier(logEntry.modifier)}</div>
        ) : null}
      </div>
      <SkillCheckAttributes
        skillId={logEntry.skillId}
        modifier={logEntry.modifier}
        width={12}
      />
      <SkillCheck3D20 skillCheckLogEntry={logEntry} width={12} />
      <SkillCheckSkillPointBreakdown
        skillCheckLogEntry={logEntry}
        width={12}
        marqueeClassName={sendBy === "me" ? "text-blue-400" : "text-slate-200"}
      />
      <SkillCheckResult skillCheckLogEntry={logEntry} />
    </div>
  );
}
