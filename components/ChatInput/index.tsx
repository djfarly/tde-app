import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { rollD6 } from "@/lib/dice";
import { Game, MessageInsert, User } from "@/supabase/schema";
import { CornerDownLeft, Dices } from "lucide-react";

export default function ChatInput({
  onAddMessage,
  gameId,
  currentUserId,
}: {
  onAddMessage?: (message: MessageInsert) => void;
  gameId: Game["id"];
  currentUserId: User["id"];
}) {
  return (
    <form
      className="absolute left-0 right-0 bottom-0 h-[--chat-input-height] z-10 rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      onSubmit={(event) => {
        event.preventDefault();
        onAddMessage?.({
          gameId,
          userId: currentUserId,
          type: "message",
          text: event.currentTarget.message.value,
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
        className="p-3 border-0 shadow-none resize-none min-h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
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
              size="sm"
              aspect="square"
              onClick={() => {
                onAddMessage?.({
                  gameId,
                  userId: currentUserId,
                  type: "message",
                  text: `rolled ${rollD6()}`,
                });
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
