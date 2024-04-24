import CharacterSheetSkills from "@/components/CharacterSheetSkills";
import { findCharacter, findDemoUser, insertMessage } from "@/services";
import { MessageInsert } from "@/supabase/schema";

export default async function SheetSkillsPage({
  params: { gameSlug, characterSlug },
}: {
  params: { gameSlug: string; characterSlug: string };
}) {
  const gameId = Number.parseInt(gameSlug, 10);
  const user = await findDemoUser();

  async function addMessage(message: MessageInsert) {
    "use server";

    await insertMessage(message);
  }

  return (
    <CharacterSheetSkills
      onAddMessage={addMessage}
      currentGameId={gameId}
      currentUserId={user.id}
    />
  );
}
