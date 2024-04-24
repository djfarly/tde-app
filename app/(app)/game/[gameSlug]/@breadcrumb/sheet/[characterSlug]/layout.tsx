import CharacterAvatar from "@/components/CharacterAvatar";
import { ComboboxGameCharacters } from "@/components/ComboboxGameCharacters";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { findCharacter } from "@/services";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

export default async function CharacterBreadcrumbLayout({
  params: { gameSlug, characterSlug },
}: {
  params: { gameSlug: string; characterSlug: string };
}) {
  const character = await findCharacter(Number.parseInt(characterSlug, 10));
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link
            href={`/game/${gameSlug}/sheet/${character?.id}`}
            className="flex items-center"
          >
            <CharacterAvatar
              characterId={character!.id}
              characterName={character!.name}
              className="mr-2"
            />
            {character?.name}
          </Link>
        </BreadcrumbLink>
        <ComboboxGameCharacters
          currentGameId={Number.parseInt(gameSlug, 10)}
          currentCharacterId={Number.parseInt(characterSlug, 10)}
        />
      </BreadcrumbItem>
    </>
  );
}
