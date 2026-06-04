import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
import { neon } from "@neondatabase/serverless";

loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);

try {
  const themes = await sql`SELECT COUNT(*)::int AS count FROM problem_themes`;
  const sponsors = await sql`SELECT COUNT(*)::int AS count FROM sponsors`;
  const schedule = await sql`SELECT COUNT(*)::int AS count FROM schedule_items`;
  const leca = await sql`SELECT COUNT(*)::int AS count FROM schedule_items WHERE schedule_type = 'leca_week'`;
  const hack = await sql`SELECT COUNT(*)::int AS count FROM schedule_items WHERE schedule_type = 'hackathon'`;
  console.log("problem_themes:", themes[0]?.count);
  console.log("sponsors:", sponsors[0]?.count);
  console.log("schedule_items:", schedule[0]?.count, "(leca_week:", leca[0]?.count + ", hackathon:", hack[0]?.count + ")");
  const sample = await sql`SELECT id, schedule_type, phase, time FROM schedule_items ORDER BY sort_order LIMIT 2`;
  console.log("sample:", sample);
} catch (e) {
  console.error("DB error:", e.message);
}
