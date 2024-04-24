import { findDemoUser, findGame } from "@/services";
import { Character, Game } from "@/supabase/schema";
import CharacterAvatar from "../CharacterAvatar";
import { ComboboxGameCharactersClient } from "./client";
import { Badge } from "../ui/badge";

export async function ComboboxGameCharacters({
  currentGameId,
  currentCharacterId,
}: {
  currentGameId: Game["id"];
  currentCharacterId: Character["id"];
}) {
  const game = await findGame(currentGameId);
  const user = await findDemoUser();

  const participationsWithActiveCharacter =
    game?.gamesUsers.filter((participation) => participation.activeCharacter) ??
    [];

  return (
    <ComboboxGameCharactersClient
      options={participationsWithActiveCharacter.map((gameParticipation) => ({
        value: gameParticipation.activeCharacter!.id,
        label: (
          <>
            <CharacterAvatar
              characterId={gameParticipation.activeCharacter!.id}
              characterName={gameParticipation.activeCharacter!.name}
              className="mr-2"
            />
            {gameParticipation.activeCharacter!.name}
            {gameParticipation.userId === user?.id && (
              <Badge variant="outline" size="sm" className="ml-3">
                Du
              </Badge>
            )}
          </>
        ),
      }))}
      currentGameId={currentGameId}
      currentCharacterId={currentCharacterId}
    />
  );
}
