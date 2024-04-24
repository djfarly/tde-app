import { cn } from "@/lib/utils";
import { Message } from "@/supabase/schema";
import { CircleCheckBig } from "lucide-react";
import ChatMessageMessage from "./Message";
import ChatMessageSkillCheck from "./SkillCheck";
import { FoundGameMessage } from "@/services";

const locale = "de";

const entryComponent = {
  message: ChatMessageMessage,
  skillCheck: ChatMessageSkillCheck,
} as const;

const entryTypeLabel = {
  message: null,
  skillCheck: "Talentprobe",
} as const;

export default function ChatMessage({
  message,
  sendBy,
}: {
  message: FoundGameMessage;
  sendBy: "me" | "other";
}) {
  const Component = entryComponent[message.type];
  const typelabel = entryTypeLabel[message.type];

  return (
    <div
      className={cn(
        "flex flex-col gap-px w-[75%]",
        sendBy === "me" ? "self-end items-end" : "self-start items-start"
      )}
    >
      <div
        className={cn(
          "text-xs px-4 text-muted-foreground font-medium font-serif"
        )}
      >
        {message.user.name}{" "}
        {message.character ? `als ${message.character.name}` : ""}
      </div>
      <Component message={message} sendBy={sendBy} />
      <div
        className={cn(
          "text-xs px-4 text-muted-foreground inline-flex items-center gap-[0.5ch]"
        )}
      >
        {typelabel ? (
          <>
            <CircleCheckBig className="size-3" /> {typelabel} –{" "}
          </>
        ) : null}
        {message.createdAt.toLocaleTimeString(locale)}
      </div>
    </div>
  );
}
