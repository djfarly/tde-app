import { findMyGameParticipations } from "@/services";
import Link from "next/link";

export default async function AppPage() {
  const myGameParticipations = await findMyGameParticipations();

  return (
    <div>
      <h1>App</h1>
      {myGameParticipations.map((gameParticipation) => (
        <div key={gameParticipation.game.id}>
          <h2>{gameParticipation.game.name}</h2>
          <p>{gameParticipation.game.description}</p>
          <Link
            className="text-indigo-700"
            href={`/game/${gameParticipation.game.id}`}
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
