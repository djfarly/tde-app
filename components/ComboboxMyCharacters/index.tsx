import {
  findMyCharacters,
  updateGameParticipationActiveCharacter,
} from "@/services";
import { Character, Game } from "@/supabase/schema";
import CharacterAvatar from "../CharacterAvatar";
import { ComboboxMyCharactersClient } from "./client";
import { Minus } from "lucide-react";
import { ReactNode } from "react";

export async function ComboboxMyCharacters({
  currentGameId,
  currentCharacterId,
  allowUnset = false,
  children,
}: {
  currentGameId: Game["id"];
  currentCharacterId?: Character["id"];
  allowUnset?: boolean;
  children?: ReactNode;
}) {
  const myCharacters = await findMyCharacters();

  async function handleSetActiveCharacter(
    gameId: Game["id"],
    selectedCharacterId: Character["id"] | null
  ) {
    "use server";

    await updateGameParticipationActiveCharacter({
      gameId: gameId,
      activeCharacterId: selectedCharacterId,
    });

    return;
  }

  const options = myCharacters
    .filter((character) => !character.gamesUsers)
    .map((character) => ({
      value: character!.id as Character["id"] | null,
      label: (
        <>
          <CharacterAvatar
            characterId={character!.id}
            characterName={character!.name}
            className="mr-2"
          />
          {character!.name}
        </>
      ),
    }));

  if (allowUnset) {
    options.unshift({
      value: null,
      label: (
        <>
          <CharacterAvatar className="mr-2">
            <Minus />
          </CharacterAvatar>
          Kein Character
        </>
      ),
    });
  }

  return (
    <ComboboxMyCharactersClient
      options={options}
      activeCharacterId={currentCharacterId}
      currentGameId={currentGameId}
      onSetActiveCharacter={handleSetActiveCharacter}
    >
      {children}
    </ComboboxMyCharactersClient>
  );
}
