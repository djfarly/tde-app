import "server-only";

import { db } from "@/supabase/db";
import {
  Character,
  Game,
  MessageInsert,
  gamesUsers,
  messages,
} from "@/supabase/schema";
import { and, eq } from "drizzle-orm";

export async function findDemoUser() {
  const demoUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, "Alice"),
  });
  if (!demoUser) {
    throw new Error("No demo user found.");
  }
  return demoUser;
}

export async function findMyGameParticipations() {
  const demoUser = await findDemoUser();
  return await db.query.gamesUsers.findMany({
    where: (gamesUsers, { eq }) => eq(gamesUsers.userId, demoUser.id),
    with: {
      game: {
        with: {
          gamesUsers: {
            with: {
              user: true,
              activeCharacter: {
                columns: { data: false, state: false },
              },
            },
          },
        },
      },
    },
  });
}

export async function findMyCharacters() {
  const demoUser = await findDemoUser();
  return await db.query.characters.findMany({
    where: (characters, { eq }) => eq(characters.userId, demoUser.id),
    columns: { data: false, state: false },
    with: {
      gamesUsers: true,
    },
  });
}

export async function findCharacter(characterId: Character["id"]) {
  if (!Number.isInteger(characterId)) {
    return;
  }
  return await db.query.characters.findFirst({
    where: (characters, { eq }) => eq(characters.id, characterId),
    with: {
      gamesUsers: {
        with: {
          user: true,
          game: true,
        },
      },
    },
  });
}

export async function findGame(gameId: Game["id"]) {
  return await db.query.games.findFirst({
    where: (games, { eq }) => eq(games.id, gameId),
    with: {
      gamesUsers: {
        with: {
          user: true,
          activeCharacter: {
            columns: { data: false, state: false },
          },
        },
        orderBy: (gamesUsers, { asc, desc }) => [
          desc(gamesUsers.gameRole),
          asc(gamesUsers.createdAt),
        ],
      },
    },
  });
}
export type GameParticipation = NonNullable<
  Awaited<ReturnType<typeof findGame>>
>["gamesUsers"][number];

export async function findMyGameParticipation(gameId: Game["id"]) {
  const demoUser = await findDemoUser();
  return await db.query.gamesUsers.findFirst({
    where: (gamesUsers, { and, eq }) =>
      and(eq(gamesUsers.userId, demoUser.id), eq(gamesUsers.gameId, gameId)),
    with: {
      activeCharacter: {
        columns: { data: false, state: false },
      },
    },
  });
}

export async function updateGameParticipationActiveCharacter({
  gameId,
  activeCharacterId,
}: {
  gameId: Game["id"];
  activeCharacterId: Character["id"] | null;
}) {
  if (!Number.isInteger(activeCharacterId) && activeCharacterId !== null) {
    throw new Error("Invalid character ID.");
  }

  if (!Number.isInteger(gameId)) {
    throw new Error("Invalid game ID.");
  }

  const demoUser = await findDemoUser();

  if (!demoUser) {
    throw new Error("No user found.");
  }

  if (activeCharacterId !== null) {
    const character = await findCharacter(activeCharacterId);
    if (!character) {
      throw new Error("Character not found.");
    }

    if (character.userId !== demoUser.id) {
      throw new Error("Character does not belong to user.");
    }
  }

  return await db
    .update(gamesUsers)
    .set({
      activeCharacterId,
    })
    .where(
      and(eq(gamesUsers.gameId, gameId), eq(gamesUsers.userId, demoUser.id))
    )
    .returning();
}

export async function insertMessage(message: MessageInsert) {
  if (!Number.isInteger(message.gameId)) {
    throw new Error("Invalid game ID.");
  }

  const demoUser = await findDemoUser();

  if (!demoUser) {
    throw new Error("No user found.");
  }

  if (message.userId !== demoUser.id) {
    throw new Error("Message does not belong to user.");
  }

  if (message.characterId) {
    if (!Number.isInteger(message.characterId)) {
      throw new Error("Invalid character ID.");
    }

    const character = await findCharacter(message.characterId);
    if (!character) {
      throw new Error("Character not found.");
    }

    if (character.userId !== demoUser.id) {
      throw new Error("Character does not belong to user.");
    }
  }

  return await db.insert(messages).values([message]).returning();
}

export async function findGameMessages({
  gameId,
  limit = 100,
  offset,
}: {
  gameId: Game["id"];
  limit?: number;
  offset?: number;
}) {
  return await db.query.messages.findMany({
    where: (messages, { eq }) => eq(messages.gameId, gameId),
    orderBy: (messages, { asc }) => asc(messages.createdAt),
    limit,
    offset,
    with: {
      user: true,
      character: { columns: { data: false, state: false } },
    },
  });
}

export type FoundGameMessage = NonNullable<
  Awaited<ReturnType<typeof findGameMessages>>
>[number];
