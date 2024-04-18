import { LogEntry } from "@/lib/log";
import ChatLogEntryMessage from "./Message";
import ChatLogEntrySkillCheck from "./SkillCheck";
import { send } from "process";
import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";

const locale = "de";

const entryComponent = {
  message: ChatLogEntryMessage,
  skillCheck: ChatLogEntrySkillCheck,
} as const;

const entryTypeLabel = {
  message: null,
  skillCheck: "Talentprobe",
} as const;

export default function ChatLogEntry({ logEntry }: { logEntry: LogEntry }) {
  const Component = entryComponent[logEntry.type];
  const typelabel = entryTypeLabel[logEntry.type];

  const sendBy = logEntry.id === "1" || logEntry.id === "2" ? "other" : "me";

  return (
    <div
      className={cn(
        "flex flex-col gap-px w-[75%]",
        sendBy === "me" ? "self-end items-end" : "self-start items-start"
      )}
    >
      <Component logEntry={logEntry as never} sendBy={sendBy} />
      <div
        className={cn(
          "text-xs px-3 text-muted-foreground inline-flex items-center gap-[0.5ch]"
        )}
      >
        {typelabel ? (
          <>
            <CircleCheckBig className="size-3" /> {typelabel} –{" "}
          </>
        ) : null}
        {logEntry.createdAt.toLocaleTimeString(locale)}
      </div>
    </div>
  );
}
