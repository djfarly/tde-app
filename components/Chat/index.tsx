import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollBar,
} from "@/components/ui/scroll-area";
import { LogEntry } from "@/lib/log";
import { useEffect, useRef } from "react";
import ChatInput from "../ChatInput";
import ChatLogEntry from "../ChatLogEntry";

const locale = "de";

export default function Chat({
  logEntries,
  onAddLogEntry,
}: {
  logEntries: LogEntry[];
  onAddLogEntry: (entry: LogEntry) => void;
}) {
  const chatlog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatlog.current?.scrollTo({
      top: chatlog.current.scrollHeight,
      behavior: "smooth",
    });
  }, [logEntries]);

  return (
    <div className="relative h-full [--chat-input-height:8rem]">
      <ScrollArea className="w-full h-full rounded-lg bg-muted">
        <ScrollAreaViewport ref={chatlog}>
          <div className="flex h-full flex-col py-4 px-3">
            {/* <Badge variant="outline" className="absolute right-3 top-3 bg-card">
              Nachrichten
            </Badge> */}
            <div className="flex-1 pb-32">
              <div className="flex flex-col items-start justify-end h-full gap-2">
                {logEntries.map((logEntry) => (
                  <ChatLogEntry key={logEntry.id} logEntry={logEntry} />
                ))}
              </div>
            </div>
          </div>
        </ScrollAreaViewport>
        <ScrollBar className="mt-1 mb-28 h-[calc(100%-var(--chat-input-height)-0.25rem)]" />
      </ScrollArea>
      <ChatInput onAddLogEntry={onAddLogEntry} />
    </div>
  );
}
