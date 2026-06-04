import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT schedule_type, phase, time, description
  FROM schedule_items
  ORDER BY sort_order ASC, id ASC
`;

const leca = rows.filter((r) => r.schedule_type === "leca_week");
const hack = rows.filter((r) => r.schedule_type === "hackathon");

console.log("leca_week:", leca.length, "hackathon:", hack.length);
console.log("first leca:", leca[0]);
console.log("first hack:", hack[0]);
