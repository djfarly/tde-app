import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { rollD6 } from "@/lib/dice";
import { LogEntry } from "@/lib/log";
import { CornerDownLeft, Dices } from "lucide-react";

export default function ChatInput({
  onAddLogEntry,
}: {
  onAddLogEntry: (entry: LogEntry) => void;
}) {
  return (
    <form
      className="absolute left-0 right-0 bottom-0 h-[--chat-input-height] z-10 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      onSubmit={(event) => {
        event.preventDefault();
        onAddLogEntry({
          type: "message",
          id: "1",
          createdAt: new Date(),
          message: event.currentTarget.message.value,
        });
        event.currentTarget.reset();
      }}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <div className="flex items-center p-3 pt-0">
        {/* <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                onAddLogEntry({
                  type: "message",
                  id: "1",
                  createdAt: new Date(),
                  message: rollD6().toString(),
                });
                // scroll chatlog to bottom
              }}
            >
              <Dices className="size-4" />
              <span className="sr-only">Würfeln</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Würfeln</TooltipContent>
        </Tooltip>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
