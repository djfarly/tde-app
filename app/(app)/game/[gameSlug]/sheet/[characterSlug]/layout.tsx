import { CharacterProvider } from "@/components/CharacterProvider";
import { CharacterSheetNavigationMenu } from "@/components/CharacterSheetNavigationMenu";
import { findCharacter } from "@/services";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function SheetLayout({
  children,
  params: { gameSlug, characterSlug },
}: {
  children: ReactNode;
  params: { gameSlug: string; characterSlug: string };
}) {
  const character = await findCharacter(Number.parseInt(characterSlug, 10));
  if (!character) {
    notFound();
  }

  return (
    <CharacterProvider character={character}>
      <CharacterSheetNavigationMenu
        gameSlug={gameSlug}
        characterSlug={characterSlug}
      />
      <div className="">{children}</div>
    </CharacterProvider>
  );
}
