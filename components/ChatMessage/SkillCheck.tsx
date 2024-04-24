import { skills } from "@/lib/core/skills";
import { formatNumberAsModifier } from "@/lib/format";
import { Message, SkillCheckData } from "@/supabase/schema";
import { VariantProps, cva } from "class-variance-authority";
import {
  SkillCheck3D20,
  SkillCheckAttributes,
  SkillCheckResult,
  SkillCheckSkillPointBreakdown,
} from "../SkillCheck";

const locale = "de";

const chatLogSkillCheckVariants = cva(
  "rounded-lg px-4 py-4 flex flex-col items-center bg-gradient-to-b from-[-50%] to-[50%]",
  {
    variants: {
      sendBy: {
        me: "from-blue-400 to-blue-500 [--log-entry-bg:#3b82f6] text-white rounded-ee-[2px]",
        other:
          "from-white to-stone-50 [--log-entry-bg:#f8fafc] text-black rounded-es-[2px]",
      },
    },
    defaultVariants: {
      sendBy: "other",
    },
  }
);

interface ChatMessageSkillCheckProps
  extends VariantProps<typeof chatLogSkillCheckVariants> {
  message: Message;
}

export default function ChatMessageSkillCheck({
  message,
  sendBy,
}: ChatMessageSkillCheckProps) {
  const skillCheckData = message.data as SkillCheckData;
  const skill = skills.find(({ id }) => id === skillCheckData.skillId)!;

  return (
    <div className={chatLogSkillCheckVariants({ sendBy })}>
      <div className="opacity-60">Talentprobe</div>
      <div className="flex items-baseline gap-2 mb-2">
        <div className="font-semibold">{skill.name[locale]}</div>
        {skillCheckData.totalModifier !== 0 ? (
          <div className="">
            {formatNumberAsModifier(skillCheckData.totalModifier)}
          </div>
        ) : null}
      </div>
      <SkillCheckAttributes
        attributeValues={skillCheckData.attributeValues}
        skillId={skillCheckData.skillId}
        modifier={skillCheckData.totalModifier}
        width={12}
      />
      <SkillCheck3D20 skillCheckData={skillCheckData} width={12} />
      <SkillCheckSkillPointBreakdown
        skillCheckData={skillCheckData}
        width={12}
        marqueeClassName={sendBy === "me" ? "text-blue-400" : "text-stone-200"}
      />
      <SkillCheckResult skillCheckData={skillCheckData} />
    </div>
  );
}
