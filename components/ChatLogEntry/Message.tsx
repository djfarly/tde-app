import { MessageLogEntry } from "@/lib/log";
import { cva, VariantProps } from "class-variance-authority";
import { Fragment } from "react";

const chatLogMessageVariants = cva(
  "rounded-lg px-4 py-2 basis-auto bg-gradient-to-b from-[-50%] to-[150%]",
  {
    variants: {
      sendBy: {
        me: "from-blue-400 to-blue-500 text-white",
        other: "from-white to-slate-50 text-black",
      },
    },
    defaultVariants: {
      sendBy: "other",
    },
  }
);

interface ChatLogEntryMessageProps
  extends VariantProps<typeof chatLogMessageVariants> {
  logEntry: MessageLogEntry;
}

export default function ChatLogEntryMessage({
  logEntry: { message },
  sendBy,
}: ChatLogEntryMessageProps) {
  return (
    <div className={chatLogMessageVariants({ sendBy })}>
      {message.split("\n").map((line, i) => (
        <Fragment key={i}>
          {line}
          <br />
        </Fragment>
      ))}
    </div>
  );
}
