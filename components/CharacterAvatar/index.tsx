import { cn } from "@/lib/utils";
import { Character } from "@/supabase/schema";
import { PersonStanding } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CharacterAvatar({
  characterId,
  characterName,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Avatar> & {
  characterId?: Character["id"];
  characterName?: Character["name"];
}) {
  return (
    <Avatar
      className={cn(
        "size-7 overflow-visible [&_svg]:size-1/2 [&_svg]:min-h-4 [&_svg]:min-w-4 [&_svg]:text-muted-foreground",
        className
      )}
      {...props}
    >
      <AvatarImage
        src={
          characterId
            ? `https://api.dicebear.com/8.x/adventurer/svg?seed=eofj230${characterId}&scale=90`
            : undefined
        }
        className="scale-125"
        alt={characterName}
      />
      <AvatarFallback>
        {children ? children : <PersonStanding />}
      </AvatarFallback>
    </Avatar>
  );
}
