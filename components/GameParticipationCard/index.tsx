import { cn } from "@/lib/utils";
import { Character, GameUser, User } from "@/supabase/schema";
import { ComponentPropsWithoutRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button, LinkButton } from "../ui/button";
import CharacterAvatar from "../CharacterAvatar";
import { GameParticipation, findDemoUser } from "@/services";
import { ComboboxMyCharacters } from "../ComboboxMyCharacters";
import { ArrowRight, Eye, PersonStanding, ScrollText } from "lucide-react";
import { LOCALE } from "@/lib/const";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { ComboboxTrigger } from "../Combobox";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default async function GameParticipationCard({
  participation: { activeCharacter, createdAt, user, gameRole },
  currentGameId,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Card> & {
  participation: GameParticipation;
  currentGameId: number;
}) {
  const currentUser = await findDemoUser();
  const isOwnParticipation = user.id === currentUser.id;

  return (
    <Card className={cn("flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {user.name}{" "}
          {gameRole === "gm" && <Badge size="sm">Spielleiter:in</Badge>}{" "}
          {gameRole === "observer" && (
            <Badge variant="secondary" size="sm">
              Beobachter:in
            </Badge>
          )}
          {isOwnParticipation && (
            <Badge variant="outline" size="sm">
              Du
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          beigetreten {createdAt.toLocaleDateString(LOCALE)}
        </CardDescription>
      </CardHeader>
      <GameParticipationCardCharacterSlot
        activeCharacter={activeCharacter ?? undefined}
        user={user}
        currentUser={currentUser}
        currentGameId={currentGameId}
      />
    </Card>
  );
}

function GameParticipationCardCharacterSlot({
  activeCharacter,
  user,
  currentUser,
  className,
  currentGameId,
}: {
  activeCharacter?: Omit<Character, "state" | "data">;
  user: User;
  currentUser: User;
  currentGameId: number;
  className?: string;
}) {
  const isOwnParticipation = user.id === currentUser.id;
  const hasActiveCharacter = !!activeCharacter;
  const canSwitchCharacter = isOwnParticipation && hasActiveCharacter;

  const characterInfo = (
    <div className="flex items-center gap-3">
      <CharacterAvatar
        characterId={activeCharacter?.id}
        characterName={activeCharacter?.name}
        className="size-10"
      />
      {hasActiveCharacter ? (
        <div className="text-lg font-medium leading-tight text-balance">
          {activeCharacter.name}
        </div>
      ) : isOwnParticipation ? (
        <div className="text-lg text-muted-foreground">Character auswählen</div>
      ) : (
        <div className="text-lg text-muted-foreground">Kein Character</div>
      )}
    </div>
  );

  return (
    <div className={cn("relative mt-auto", className)}>
      {activeCharacter ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <GameParticipationCardCharacterSlotContainer asChild>
              <Link
                href={`/game/${currentGameId}/sheet/${activeCharacter.id}`}
                className={cn({ "pr-20": canSwitchCharacter })}
              >
                {characterInfo}
              </Link>
            </GameParticipationCardCharacterSlotContainer>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="flex items-center">
            <ScrollText className="mr-2 size-4" />
            Characterbogen ansehen
          </TooltipContent>
        </Tooltip>
      ) : isOwnParticipation ? (
        <Tooltip>
          <ComboboxMyCharacters currentGameId={currentGameId}>
            <TooltipTrigger asChild>
              <ComboboxTrigger asChild>
                <GameParticipationCardCharacterSlotContainer asChild>
                  <button type="button">{characterInfo}</button>
                </GameParticipationCardCharacterSlotContainer>
              </ComboboxTrigger>
            </TooltipTrigger>
          </ComboboxMyCharacters>
          <TooltipContent side="bottom" className="flex items-center">
            <PersonStanding className="mr-2 size-4" />
            Character auswählen
          </TooltipContent>
        </Tooltip>
      ) : (
        <GameParticipationCardCharacterSlotContainer>
          {characterInfo}
        </GameParticipationCardCharacterSlotContainer>
      )}
      {canSwitchCharacter && (
        <div className="absolute -translate-y-1/2 right-6 top-1/2">
          <ComboboxMyCharacters currentGameId={currentGameId} allowUnset />
        </div>
      )}
    </div>
  );
}

function GameParticipationCardCharacterSlotContainer({
  children,
  asChild = false,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "block w-full py-4 pl-4 pr-6 transition-colors border-t-2 border-dashed rounded-b-lg border-border bg-stone-50 hover:[&:is(button,a)]:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background select-none",
        className
      )}
    >
      {children}
    </Comp>
  );
}

// function GameParticipationCardSelectCharacter({
//   participation,
//   currentUser,
//   className,
//   currentGameId,
//   ...props
// }: ComponentPropsWithoutRef<typeof Card> & {
//   participation: GameParticipation;
//   currentUser: User;
//   currentGameId: number;
// }) {
//   return (
//     <Card className={cn("mt-12", className)} {...props}>
//       <CharacterAvatar className="mx-auto -mt-12 size-24" />
//       <CardContent>
//         <CardContent className="grid place-items-center">
//           {participation.user.id === currentUser.id ? (
//             <div>
//               <p className="pt-8 pb-4 text-muted-foreground">
//                 Du hast noch keinen Character ausgewählt
//               </p>
//               <ComboboxMyCharacters currentGameId={currentGameId} />
//             </div>
//           ) : (
//             <p className="pt-8 pb-4 text-muted-foreground">
//               {participation.user.name} hat noch keinen Character ausgewählt
//             </p>
//           )}
//         </CardContent>
//       </CardContent>
//       <CardFooter>
//         <Button type="button">Ansehen</Button>
//       </CardFooter>
//     </Card>
//   );
// }

// function GameParticipationCardGm({
//   participation,
//   currentUser,
//   className,
//   currentGameId,
//   ...props
// }: ComponentPropsWithoutRef<typeof Card> & {
//   participation: GameParticipation;
//   currentUser: User;
//   currentGameId: number;
// }) {
//   return (
//     <Card className={cn("mt-12", className)} {...props}>
//       <CharacterAvatar
//         characterId={participation.activeCharacter?.id}
//         characterName={participation.activeCharacter?.name}
//         className="mx-auto -mt-12 size-24"
//       >
//         <Eye className="stroke-black" />
//       </CharacterAvatar>
//       <CardHeader>
//         <CardTitle>Spielleiter:in</CardTitle>
//         <CardDescription>{participation.user.name}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         Du kannst als Spielleiter einen Character auswählen…
//         {participation.user.id === currentUser.id ? (
//           <ComboboxMyCharacters currentGameId={currentGameId} allowUnset />
//         ) : null}
//       </CardContent>
//       <CardFooter></CardFooter>
//     </Card>
//   );
// }
