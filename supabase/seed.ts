import { CharacterData } from "@/lib/optolith";
import characterData from "../lib/chars/faffi.json";
import { db } from "./db";
import { characters, games, gamesUsers, messages, users } from "./schema";

if (
  process.env.DB_URL !==
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres"
) {
  throw new Error("You should only seed the local database…");
}

// seed users table with 3 users
const [alice, bob, charlie] = await db
  .insert(users)
  .values([
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
  ])
  .returning();

// seed games table with 1 game
const [game] = await db
  .insert(games)
  .values({
    name: "Schattenfluch",
    description:
      "Eine epische Reise durch magische Welten, wo Helden gegen finstere Mächte kämpfen und Schätze jenseits der Vorstellungskraft finden.",
  })
  .returning();

// seed characters table with 5 characters (alice has 3 characters, bob has 1, charlie has 1)
// data always is: characterData as CharacterData // sql`${characterData}::jsonb`
const [
  alicesCharacter1,
  alicesCharacter2,
  alicesCharacter3,
  bobsCharacter,
  charliesCharacter,
] = await db
  .insert(characters)
  .values([
    {
      name: "Rosalind von Falkenstein",
      userId: alice.id,
      data: characterData as CharacterData,
    },
    {
      name: "Rondrahilf Alberich",
      userId: alice.id,
      data: characterData as CharacterData,
    },
    {
      name: 'Raffaella "Faffi" Ferrera Roché',
      userId: alice.id,
      data: characterData as CharacterData,
    },
    {
      name: "Isora d'Illumnesto",
      userId: bob.id,
      data: characterData as CharacterData,
    },
    {
      name: "Jucco von Tomrath",
      userId: charlie.id,
      data: characterData as CharacterData,
    },
  ])
  .returning();

// seed games_users table with alice, bob and charlie as players of game 1
await db
  .insert(gamesUsers)
  .values([
    {
      userId: alice.id,
      gameId: game.id,
      gameRole: "gm",
    },
    { userId: bob.id, gameId: game.id, activeCharacterId: bobsCharacter.id },
    {
      userId: charlie.id,
      gameId: game.id,
      activeCharacterId: charliesCharacter.id,
    },
  ])
  .returning();

// add 5 messages to game 1
await db
  .insert(messages)
  .values([
    {
      gameId: game.id,
      userId: alice.id,
      text: "Hey folks, let's play!",
    },
    {
      gameId: game.id,
      userId: bob.id,
      characterId: bobsCharacter.id,
      text: "Sure, let's do it!",
    },
    {
      gameId: game.id,
      userId: charlie.id,
      characterId: charliesCharacter.id,
      text: "I'm in!",
    },
    {
      gameId: game.id,
      userId: alice.id,
      text: "Great! Let's start!",
    },
    {
      gameId: game.id,
      userId: bob.id,
      characterId: bobsCharacter.id,
      text: "I'm ready!",
    },
  ])
  .returning();
