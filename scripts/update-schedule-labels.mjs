import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);

const entries = [
  ["schedule_day1_label", "Day 1"],
  ["schedule_day2_label", "Day 2"],
];

for (const [key, value] of entries) {
  await sql`
    INSERT INTO site_settings (key, value)
    VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

console.log("Updated schedule tab labels to Day 1 / Day 2");
