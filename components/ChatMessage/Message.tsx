import { Message } from "@/supabase/schema";
import { cva, VariantProps } from "class-variance-authority";
import { Fragment } from "react";

const chatLogMessageVariants = cva(
  "rounded-lg px-4 py-2 basis-auto bg-gradient-to-b from-[-50%] to-[150%]",
  {
    variants: {
      sendBy: {
        me: "from-blue-400 to-blue-500 text-white rounded-ee-[2px]",
        other: "from-white to-stone-50 text-black rounded-es-[2px]",
      },
    },
    defaultVariants: {
      sendBy: "other",
    },
  }
);

interface ChatMessageMessageProps
  extends VariantProps<typeof chatLogMessageVariants> {
  message: Message;
}

export default function ChatMessageMessage({
  message,
  sendBy,
}: ChatMessageMessageProps) {
  if (!message.text) return null;

  return (
    <div className={chatLogMessageVariants({ sendBy })}>
      {message.text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {line}
          <br />
        </Fragment>
      ))}
    </div>
  );
}
