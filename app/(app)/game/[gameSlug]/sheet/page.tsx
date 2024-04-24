import { findDemoUser, findGame } from "@/services";
import { redirect } from "next/navigation";

export default async function SheetPage({
  params: { gameSlug },
}: {
  params: { gameSlug: string };
}) {
  const game = await findGame(Number.parseInt(gameSlug, 10));
  const demoUser = await findDemoUser();

  const myParticipation = game?.gamesUsers?.find(
    (gu) => gu.userId === demoUser.id
  );

  if (myParticipation && myParticipation.activeCharacterId) {
    redirect(`/game/${gameSlug}/sheet/${myParticipation.activeCharacterId}`);
  }

  return (
    <div>
      <div>kein aktiver char… da muss man wohl einen auswählen…</div>
    </div>
  );
}
