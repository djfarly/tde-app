import { defineConfig } from "drizzle-kit";

export const connectionString =
  process.env.DB_URL ??
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

export default defineConfig({
  schema: "./supabase/schema/index.ts",
  out: "./supabase/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
  verbose: true,
  strict: true,
});
