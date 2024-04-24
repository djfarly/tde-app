import { findMyGameParticipations } from "@/services";
import { Game } from "@/supabase/schema";
import { ComboboxMyGameParticipationsClient } from "./client";
import GameAvatar from "../GameAvatar";

export async function ComboboxMyGameParticipations({
  currentGameId,
}: {
  currentGameId: Game["id"];
}) {
  const myGameParticipations = await findMyGameParticipations();

  return (
    <ComboboxMyGameParticipationsClient
      options={myGameParticipations.map((gameParticipation) => ({
        value: gameParticipation.game.id,
        label: (
          <>
            <GameAvatar
              gameId={gameParticipation.game.id}
              gameName={gameParticipation.game.name}
              className="mr-2"
            />
            {gameParticipation.game.name}
          </>
        ),
      }))}
      currentGameId={currentGameId}
    />
  );
}
