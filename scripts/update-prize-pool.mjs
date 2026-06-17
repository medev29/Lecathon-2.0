import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);
await sql`
  INSERT INTO site_settings (key, value)
  VALUES ('prize_pool', 'NPR 1Lakh+')
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
`;
console.log("Updated prize_pool to NPR 1Lakh+");
