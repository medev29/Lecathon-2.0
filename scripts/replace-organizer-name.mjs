import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const ORGANIZER =
  "Robotics Club of Lumbini Engineering Management & Science College";
const OLD = "LEC-HACKS";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);

await sql`
  UPDATE site_settings
  SET value = REPLACE(value, ${OLD}, ${ORGANIZER})
  WHERE value LIKE ${"%" + OLD + "%"}
`;

await sql`
  UPDATE schedule_items
  SET description = REPLACE(description, ${OLD}, ${ORGANIZER})
  WHERE description LIKE ${"%" + OLD + "%"}
`;

console.log("Replaced LEC-HACKS in database content");
