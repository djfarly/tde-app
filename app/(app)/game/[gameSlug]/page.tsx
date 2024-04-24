import GameParticipationCard from "@/components/GameParticipationCard";
import { findGame } from "@/services";

export default async function GamePage({
  params: { gameSlug },
}: {
  params: { gameSlug: string };
}) {
  const game = await findGame(Number.parseInt(gameSlug, 10));

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {game?.gamesUsers.map((gameUser) => (
          <GameParticipationCard
            key={gameUser.user?.id}
            participation={gameUser}
            currentGameId={game!.id}
          />
        ))}
      </div>
    </div>
  );
}
