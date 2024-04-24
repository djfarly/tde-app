import { ConditionState } from "@/lib/core/conditions";
import { _3D20Values } from "@/lib/dice";
import * as Optolith from "@/lib/optolith";
import { SkillCheckChance, SkillCheckResult } from "@/lib/skillCheck";
import { Skill } from "@/lib/core/skills";
import { relations, type InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ many }) => ({
  characters: many(characters),
  gamesUsers: many(gamesUsers),
  messages: many(messages),
}));

export const games = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    name: text("name").notNull(),
    description: text("description"),
  },
  (table) => ({
    gamesNameIndex: index("games_name_idx").on(table.name),
  })
);

export type Game = typeof games.$inferSelect;

export const gamesRelations = relations(games, ({ many, one }) => ({
  gamesUsers: many(gamesUsers),
  messages: many(messages),
  characters: many(characters),
}));

export const characters = pgTable(
  "characters",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    gameId: integer("game_id").references(() => games.id),
    name: text("name").notNull(),
    data: jsonb("data").notNull().default({}).$type<Optolith.CharacterData>(),
    state: jsonb("state").notNull().default({}).$type<{
      hp: number;
      conditions: ConditionState[];
    }>(),
  },
  (table) => ({
    charactersGameIdIndex: index("characters_game_id_idx").on(table.gameId),
    charactersUserIdIndex: index("characters_user_id_idx").on(table.userId),
  })
);

export type Character = typeof characters.$inferSelect;

export const charactersRelations = relations(characters, ({ many, one }) => ({
  user: one(users),
  gamesUsers: one(gamesUsers),
}));

export const gameRole = pgEnum("game_role", ["player", "gm", "observer"]);

export type GameRole = (typeof gameRole.enumValues)[number];

export const gamesUsers = pgTable(
  "games_users",
  {
    gameId: integer("game_id")
      .references(() => games.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    activeCharacterId: integer("active_character_id").references(
      () => characters.id
    ),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    gameRole: gameRole("game_role").notNull().default("player"),
  },
  (table) => ({
    gamesUsersPrimaryKey: primaryKey({
      columns: [table.gameId, table.userId],
      name: "games_users_pkey",
    }),
    gamesUsersGameIdIndex: index("games_users_game_id_idx").on(table.gameId),
    gamesUsersUserIdIndex: index("games_users_user_id_idx").on(table.userId),
    gamesUsersActiveCharacterIdIndex: index(
      "games_users_active_character_id_idx"
    ).on(table.activeCharacterId),
  })
);

export type GameUser = typeof gamesUsers.$inferSelect;

export const gamesUsersRelations = relations(gamesUsers, ({ many, one }) => ({
  user: one(users, {
    fields: [gamesUsers.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [gamesUsers.gameId],
    references: [games.id],
  }),
  activeCharacter: one(characters, {
    fields: [gamesUsers.activeCharacterId],
    references: [characters.id],
  }),
}));

export const messageType = pgEnum("message_type", ["message", "skillCheck"]);

export type MessageType = (typeof messageType.enumValues)[number];

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    gameId: integer("game_id")
      .references(() => games.id)
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    characterId: integer("character_id").references(() => characters.id),
    text: text("text"),
    type: messageType("type").notNull().default("message"),
    data: jsonb("data")
      .notNull()
      .default({})
      .$type<MessageDataEmpty | SkillCheckData>(),
  },
  (table) => ({
    messagesGameIdIndex: index("messages_game_id_idx").on(table.gameId),
    messagesUserIdIndex: index("messages_user_id_idx").on(table.userId),
    messagesCharacterIdIndex: index("messages_character_id_idx").on(
      table.characterId
    ),
  })
);

export type MessageDataEmpty = Record<string, never>;
export type SkillCheckData = {
  skillId: Skill["id"];
  attributeValues: [number, number, number];
  skillPoints: number;
  currentConditions: ConditionState[];
  modifier: number;
  totalModifier: number;
  chance: SkillCheckChance;
  rolls: _3D20Values;
  result: SkillCheckResult;
};

export type Message = typeof messages.$inferSelect;
export type MessageInsert = typeof messages.$inferInsert;

export const messagesRelations = relations(messages, ({ many, one }) => ({
  user: one(users, {
    fields: [messages.userId],
    references: [users.id],
  }),
  game: one(games),
  character: one(characters, {
    fields: [messages.characterId],
    references: [characters.id],
  }),
}));
