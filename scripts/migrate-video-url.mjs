import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);

await sql`
  ALTER TABLE registrations
  ADD COLUMN IF NOT EXISTS video_url TEXT
`;

console.log("Added video_url column to registrations");
