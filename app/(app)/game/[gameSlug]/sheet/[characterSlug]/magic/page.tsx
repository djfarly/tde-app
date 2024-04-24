import { findCharacter } from "@/services";

export default async function SheetMagicPage({
  params: { gameSlug, characterSlug },
}: {
  params: { gameSlug: string; characterSlug: string };
}) {
  const character = await findCharacter(Number.parseInt(characterSlug, 10));

  return (
    <div>
      <div>Magie</div>
      <div>{character?.name}</div>
    </div>
  );
}
