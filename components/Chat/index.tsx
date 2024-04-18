import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollBar,
} from "@/components/ui/scroll-area";
import { LogEntry } from "@/lib/log";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatInput from "../ChatInput";
import ChatLogEntry from "../ChatLogEntry";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

const locale = "de";

function useScrollAreaAutoScroll({
  viewportRef,
  scrollAreaRef,
  endRef,
  data,
}: {
  viewportRef: React.RefObject<HTMLElement>;
  scrollAreaRef: React.RefObject<HTMLElement>;
  endRef: React.RefObject<HTMLElement>;
  data: unknown;
}) {
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true);
  const isAutoScrollActiveRef = useRef(isAutoScrollActive);
  useEffect(() => {
    isAutoScrollActiveRef.current = isAutoScrollActive;
  }, [isAutoScrollActive]);

  const scrollToBottom = useCallback(() => {
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [viewportRef]);

  useEffect(() => {
    void data;
    if (isAutoScrollActiveRef.current) scrollToBottom();
  }, [data, scrollToBottom]);

  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // observe chatlog (endRef) to detect if user scrolled up
  useEffect(() => {
    const endElement = endRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledUp(!entry.isIntersecting);
      },
      { threshold: 1, root: scrollAreaRef.current }
    );

    if (endElement) observer.observe(endElement);

    return () => {
      if (endElement) observer.unobserve(endElement);
    };
  }, [endRef, scrollAreaRef]);

  return {
    isAutoScrollActive,
    setIsAutoScrollActive,
    isScrolledUp,
    scrollToBottom,
  };
}

const MotionButton = motion(Button);

export default function Chat({
  logEntries,
  onAddLogEntry,
}: {
  logEntries: LogEntry[];
  onAddLogEntry: (entry: LogEntry) => void;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const {
    isAutoScrollActive,
    setIsAutoScrollActive,
    isScrolledUp,
    scrollToBottom,
  } = useScrollAreaAutoScroll({
    viewportRef,
    scrollAreaRef,
    endRef,
    data: logEntries,
  });

  return (
    <div className="relative h-full [--chat-input-height:8rem]">
      <ScrollArea
        className="w-full h-full rounded-lg bg-muted"
        ref={scrollAreaRef}
      >
        <ScrollAreaViewport ref={viewportRef}>
          <div className="flex h-full flex-col py-4 px-3">
            <Badge
              className="absolute top-2 right-2 pl-1 bg-card items-center select-none gap-2 z-20"
              variant="outline"
              size="sm"
              asChild
            >
              <label>
                <Switch
                  size="xs"
                  checked={isAutoScrollActive}
                  onCheckedChange={setIsAutoScrollActive}
                />
                <span>Auto scroll</span>
              </label>
            </Badge>

            <AnimatePresence>
              {isScrolledUp ? (
                <MotionButton
                  key="scroll-to-bottom"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { delay: 1 },
                  }}
                  exit={{ y: 16, opacity: 0 }}
                  style={{ x: "-50%" }}
                  variant="outline"
                  size="icon"
                  className="absolute bottom-36 left-1/2 z-20 rounded-full shadow-md"
                  onClick={scrollToBottom}
                >
                  <ChevronsDown className="size-4" />
                </MotionButton>
              ) : null}
            </AnimatePresence>
            <div className="flex-1 pb-32">
              <div className="flex flex-col items-start justify-end h-full gap-2">
                {logEntries.map((logEntry) => (
                  <ChatLogEntry key={logEntry.id} logEntry={logEntry} />
                ))}
              </div>
              <div ref={endRef} />
            </div>
          </div>
        </ScrollAreaViewport>
        <ScrollBar className="mt-1 mb-28 h-[calc(100%-var(--chat-input-height)-0.25rem)]" />
      </ScrollArea>
      <ChatInput onAddLogEntry={onAddLogEntry} />
    </div>
  );
}
