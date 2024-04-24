import { cn } from "@/lib/utils";
import { Game } from "@/supabase/schema";
import { NotebookTabs } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function GameAvatar({
  gameId,
  gameName,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Avatar> & {
  gameId?: Game["id"];
  gameName?: Game["name"];
}) {
  return (
    <Avatar className={cn("size-7 bg-muted", className)} {...props}>
      <AvatarImage
        src={
          gameId
            ? `https://api.dicebear.com/8.x/rings/svg?seed=ef409r3${gameId}`
            : undefined
        }
        alt={gameName}
      />
      <AvatarFallback>
        <NotebookTabs className="size-1/2 text-muted-foreground" />
      </AvatarFallback>
    </Avatar>
  );
}
